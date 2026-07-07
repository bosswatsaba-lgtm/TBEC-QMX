import { prisma } from "@/lib/prisma";
import { TakeoffClient } from "./client";

export default async function TakeoffPage() {
  const project = await prisma.project.findFirst({ include: { measurements: true } });
  const measurements = project?.measurements.map((m) => ({
    id: m.id, label: m.label, phase: m.phase, smm7Code: m.smm7Code, value: m.value, unit: m.unit, active: m.active,
  })) ?? [];

  return <TakeoffClient measurements={measurements} />;
}
