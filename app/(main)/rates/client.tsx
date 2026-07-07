"use client";

import { useState } from "react";

interface MatItem {
  id: string; name: string; unit: string; rate: number; wastage: number; effectiveRate: number; supplierName: string; supplierId: string | null;
}

interface CatData {
  id: string; name: string; materials: MatItem[];
}

export function RatesClient({ categories }: { categories: CatData[] }) {
  const [activeCat, setActiveCat] = useState(categories[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const activeMaterials = categories.find((c) => c.id === activeCat)?.materials ?? [];
  const filtered = search ? activeMaterials.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())) : activeMaterials;

  return (
    <>
      <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center w-full h-10 shrink-0 px-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-[18px]">payments</span>
          <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-tight">TBEC QMX</span>
          <span className="text-outline mx-1 font-body-sm text-body-sm">/</span>
          <span className="font-data-mono text-data-mono text-secondary lowercase">rate-master</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none"><span className="material-symbols-outlined text-[20px]">file_download</span></button>
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none"><span className="material-symbols-outlined text-[20px]">sync</span></button>
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none"><span className="material-symbols-outlined text-[20px]">help</span></button>
          <div className="w-7 h-7 ml-1 bg-primary-container flex items-center justify-center text-on-primary font-data-mono text-data-mono">JD</div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-headline text-headline text-on-surface">Material Rate Master</h1>
            <p className="font-body-sm text-body-sm text-secondary mt-0.5">Pricing and wastage rates per material category. Supplier-tabulated with on-the-fly effective rate calculations.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-3 py-1.5">
          <span className="material-symbols-outlined text-[18px] text-secondary">search</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search materials..."
            className="flex-1 font-body-sm text-body-sm bg-transparent text-on-surface placeholder:text-secondary border-none outline-none" />
        </div>
        <div className="flex gap-1 border-b border-outline-variant">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)}
              className={`px-3 py-1.5 text-body-sm font-body-sm transition-colors rounded-none relative ${activeCat === cat.id ? "text-primary border-b-2 border-primary-container" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"}`}>
              {cat.name}
              <span className="ml-1 text-[10px] text-secondary">({cat.materials.length})</span>
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-hidden border border-outline-variant">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-dim border-b border-outline-variant sticky top-0">
                <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Material</th>
                <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Supplier</th>
                <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant w-[60px]">Unit</th>
                <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant text-right w-[100px]">Base Rate</th>
                <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant text-right w-[80px]">Wastage</th>
                <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant text-right w-[120px]">Effective Rate</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={m.id} className={`h-7 border-b border-outline-variant/30 hover:bg-surface-container-highest transition-colors ${i % 2 === 0 ? "bg-surface" : "bg-surface-container-low"}`}>
                  <td className="px-3 font-body-sm text-body-sm text-on-surface">{m.name}</td>
                  <td className="px-3 font-data-mono text-data-mono text-secondary text-sm">{m.supplierName}</td>
                  <td className="px-3 font-data-mono text-data-mono text-on-surface-variant">{m.unit}</td>
                  <td className="px-3 font-data-mono text-data-mono text-on-surface text-right">${m.rate.toFixed(2)}</td>
                  <td className="px-3 font-data-mono text-data-mono text-on-surface text-right">{(m.wastage * 100).toFixed(0)}%</td>
                  <td className="px-3 font-data-mono text-data-mono text-primary text-right font-semibold">${m.effectiveRate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
