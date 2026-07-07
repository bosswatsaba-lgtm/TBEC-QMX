import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { Phase, MeasurementUnit, ProjectStatus } from "../app/generated/prisma/enums";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "tbec-engineering" },
    update: {},
    create: { name: "TBEC Engineering Group", slug: "tbec-engineering" },
  });

  const project = await prisma.project.upsert({
    where: { id: "default-project" },
    update: {},
    create: {
      id: "default-project",
      name: "Apex Tower Foundation",
      client: "Global Logistics Inc.",
      location: "Seattle, WA",
      region: "NA-E",
      currency: "USD",
      status: ProjectStatus.CALCULATING,
      totalValue: 124500000,
      tenantId: tenant.id,
    },
  });

  const phasesData = [
    { phase: Phase.EARTHWORKS, pct: 100, quantified: 9941, total: 9941 },
    { phase: Phase.SUBSTRUCTURE, pct: 85, quantified: 8450, total: 9941 },
    { phase: Phase.SUPERSTRUCTURE, pct: 20, quantified: 1200, total: 6000 },
    { phase: Phase.ROOFING, pct: 0, quantified: 0, total: 2800 },
    { phase: Phase.FINISHES, pct: 0, quantified: 0, total: 3500 },
  ];

  for (const p of phasesData) {
    await prisma.phaseProgress.upsert({
      where: { projectId_phase: { projectId: project.id, phase: p.phase } },
      update: {},
      create: { projectId: project.id, ...p },
    });
  }

  const measurementsData = [
    { label: "Foundation Wall A", phase: Phase.SUBSTRUCTURE, smm7Code: "F10.111", value: 45.2, unit: MeasurementUnit.M, active: true },
    { label: "Slab Area Z1", phase: Phase.SUBSTRUCTURE, smm7Code: "E10.1", value: 124.5, unit: MeasurementUnit.M2, active: false },
    { label: "Pier Excavation", phase: Phase.SUBSTRUCTURE, smm7Code: "D20.2", value: 18.2, unit: MeasurementUnit.M3, active: false },
    { label: "Beam B3 Span", phase: Phase.SUPERSTRUCTURE, smm7Code: "F20.1", value: 8.4, unit: MeasurementUnit.M, active: false },
  ];

  for (const m of measurementsData) {
    await prisma.measurement.create({ data: { ...m, projectId: project.id } });
  }

  const boqItems = [
    { code: "E10.1", description: "Excavation of foundation trenches, depth >1.0m ≤2.0m", unit: "m³", quantity: 8450, rate: 12.5 },
    { code: "F10.111", description: "Reinforced concrete C25/30 in foundation walls", unit: "m³", quantity: 3200, rate: 185.0 },
    { code: "F20.1", description: "Steel reinforcement bar Ø12mm (Grade B500B)", unit: "t", quantity: 124.5, rate: 890.0 },
    { code: "D20.2", description: "Earthwork fill to structures — imported granular", unit: "m³", quantity: 2180, rate: 28.75 },
    { code: "R10.1", description: "Structural steel framing — universal beams UB 533×210", unit: "t", quantity: 48.2, rate: 2150.0 },
    { code: "E30.1", description: "Disposal of excavated material off-site", unit: "m³", quantity: 5600, rate: 18.5 },
    { code: "F30.2", description: "Formwork to vertical faces of walls (height ≤ 4m)", unit: "m²", quantity: 4200, rate: 42.0 },
    { code: "K10.1", description: "Brick/block walling — 200mm hollow concrete block", unit: "m²", quantity: 1850, rate: 68.0 },
  ];

  for (const item of boqItems) {
    const total = +(item.quantity * item.rate).toFixed(2);
    await prisma.boqItem.create({ data: { ...item, total, projectId: project.id } });
  }

  const supplier = await prisma.supplier.upsert({
    where: { id: "default-supplier" },
    update: {},
    create: { id: "default-supplier", name: "BuildCo Materials Ltd" },
  });

  await prisma.supplier.upsert({
    where: { id: "metro-steel" },
    update: {},
    create: { id: "metro-steel", name: "MetroSteel Corp" },
  });

  const categories = ["Concrete & Masonry", "Steel & Metals", "Labour Rates", "Plant & Equipment"];
  const catRecords: Record<string, string> = {};
  for (const name of categories) {
    const cat = await prisma.materialCategory.upsert({ where: { name }, update: {}, create: { name } });
    catRecords[name] = cat.id;
  }

  const materials = [
    { code: "MAT-C25-001", name: "Concrete C25/30 — Ready Mix", category: "Concrete & Masonry", unit: "m³", rate: 185.0, wastage: 5.0, supplierId: "default-supplier" },
    { code: "MAT-C40-002", name: "Concrete C40/50 — High Strength", category: "Concrete & Masonry", unit: "m³", rate: 245.0, wastage: 3.5, supplierId: "default-supplier" },
    { code: "MAT-B500-003", name: "Steel Rebar Ø12mm B500B", category: "Steel & Metals", unit: "t", rate: 890.0, wastage: 8.0, supplierId: "metro-steel" },
    { code: "MAT-B500-004", name: "Steel Rebar Ø20mm B500B", category: "Steel & Metals", unit: "t", rate: 875.0, wastage: 7.5, supplierId: "metro-steel" },
    { code: "MAT-BLK-005", name: "Concrete Block 200mm Hollow", category: "Concrete & Masonry", unit: "m²", rate: 68.0, wastage: 4.0, supplierId: "default-supplier" },
    { code: "MAT-SAND-006", name: "Sharp Sand — Coarse Grade", category: "Concrete & Masonry", unit: "t", rate: 32.5, wastage: 10.0, supplierId: "default-supplier" },
    { code: "MAT-LAB-007", name: "General Labourer (Skilled)", category: "Labour Rates", unit: "hr", rate: 38.0, wastage: 0 },
    { code: "MAT-LAB-008", name: "Steel Fixer (Certified)", category: "Labour Rates", unit: "hr", rate: 52.0, wastage: 0 },
    { code: "MAT-PLANT-009", name: "Excavator 20t — Tracked", category: "Plant & Equipment", unit: "day", rate: 450.0, wastage: 0 },
    { code: "MAT-PLANT-010", name: "Concrete Pump — Boom 36m", category: "Plant & Equipment", unit: "day", rate: 680.0, wastage: 0 },
  ];

  for (const m of materials) {
    const { category, ...data } = m;
    await prisma.materialRate.upsert({
      where: { code: data.code },
      update: {},
      create: { ...data, categoryId: catRecords[category] },
    });
  }

  console.log("Seed complete.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
