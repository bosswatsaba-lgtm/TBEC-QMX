import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const tenant = await prisma.tenant.findFirst({ include: { projects: { include: { phases: true, boqItems: true } } } });
  if (!tenant) return NextResponse.json({ projects: [], phases: [], kpis: { projects: 0, cost: 0, members: 0 } });

  const totalCost = tenant.projects.reduce((sum, p) => sum + (p.totalValue ?? 0), 0);
  const allPhases = tenant.projects.flatMap((p) => p.phases);

  return NextResponse.json({
    tenant: { name: tenant.name, slug: tenant.slug },
    projects: tenant.projects.map((p) => ({
      id: p.id, name: p.name, location: p.location, status: p.status,
      modified: p.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    })),
    phases: allPhases,
    kpis: { projects: tenant.projects.length, cost: totalCost, members: 32 },
  });
}
