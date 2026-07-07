import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.materialCategory.findMany({ include: { materials: { include: { supplier: true } } } });
  const materials = categories.flatMap((c) =>
    c.materials.map((m) => ({ ...m, category: c.name, supplier: m.supplier?.name ?? null }))
  );
  return NextResponse.json({ categories: categories.map((c) => c.name), materials });
}
