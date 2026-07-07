import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const project = await prisma.project.findFirst({ include: { measurements: true } });
  if (!project) return NextResponse.json({ project: null, measurements: [] });
  return NextResponse.json({ project: { id: project.id, name: project.name }, measurements: project.measurements });
}
