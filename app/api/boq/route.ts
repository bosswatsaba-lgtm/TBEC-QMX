import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const project = await prisma.project.findFirst({ include: { boqItems: true } });
  if (!project) return NextResponse.json({ items: [], grandTotal: 0 });
  const grandTotal = project.boqItems.reduce((sum, i) => sum + i.total, 0);
  return NextResponse.json({ items: project.boqItems, grandTotal });
}
