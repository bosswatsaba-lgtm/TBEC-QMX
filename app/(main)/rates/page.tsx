import { prisma } from "@/lib/prisma";
import { RatesClient } from "./client";

export default async function RatesPage() {
  const categories = await prisma.materialCategory.findMany({ orderBy: { name: "asc" }, include: { materials: { include: { supplier: true } } } });
  const categoriesData = categories.map((cat) => ({
    id: cat.id, name: cat.name, materials: cat.materials.map((m) => ({
      id: m.id, name: m.name, unit: m.unit, rate: m.rate, wastage: m.wastage, effectiveRate: +(m.rate * (1 + m.wastage)).toFixed(2), supplierName: m.supplier?.name ?? "—", supplierId: m.supplierId,
    })),
  }));

  return <RatesClient categories={categoriesData} />;
}
