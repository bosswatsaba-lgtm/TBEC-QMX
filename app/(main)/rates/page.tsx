"use client";

import { useState } from "react";

const tabs = ["All Materials", "Concrete & Masonry", "Steel & Metals", "Labour Rates", "Plant & Equipment"];

const materials = [
  { code: "MAT-C25-001", name: "Concrete C25/30 — Ready Mix", category: "Concrete & Masonry", unit: "m³", rate: 185.00, supplier: "BuildCo Materials Ltd", wastage: 5.0, lastUpdated: "2024-10-15" },
  { code: "MAT-C40-002", name: "Concrete C40/50 — High Strength", category: "Concrete & Masonry", unit: "m³", rate: 245.00, supplier: "BuildCo Materials Ltd", wastage: 3.5, lastUpdated: "2024-10-15" },
  { code: "MAT-B500-003", name: "Steel Rebar Ø12mm B500B", category: "Steel & Metals", unit: "t", rate: 890.00, supplier: "MetroSteel Corp", wastage: 8.0, lastUpdated: "2024-10-12" },
  { code: "MAT-B500-004", name: "Steel Rebar Ø20mm B500B", category: "Steel & Metals", unit: "t", rate: 875.00, supplier: "MetroSteel Corp", wastage: 7.5, lastUpdated: "2024-10-12" },
  { code: "MAT-BLK-005", name: "Concrete Block 200mm Hollow", category: "Concrete & Masonry", unit: "m²", rate: 68.00, supplier: "MasonryPro Ltd", wastage: 4.0, lastUpdated: "2024-10-10" },
  { code: "MAT-SAND-006", name: "Sharp Sand — Coarse Grade", category: "Concrete & Masonry", unit: "t", rate: 32.50, supplier: "AggSource Ltd", wastage: 10.0, lastUpdated: "2024-10-08" },
  { code: "MAT-LAB-007", name: "General Labourer (Skilled)", category: "Labour Rates", unit: "hr", rate: 38.00, supplier: "TBEC Labour Pool", wastage: 0, lastUpdated: "2024-10-01" },
  { code: "MAT-LAB-008", name: "Steel Fixer (Certified)", category: "Labour Rates", unit: "hr", rate: 52.00, supplier: "TBEC Labour Pool", wastage: 0, lastUpdated: "2024-10-01" },
  { code: "MAT-PLANT-009", name: "Excavator 20t — Tracked", category: "Plant & Equipment", unit: "day", rate: 450.00, supplier: "Plant Hire UK", wastage: 0, lastUpdated: "2024-09-28" },
  { code: "MAT-PLANT-010", name: "Concrete Pump — Boom 36m", category: "Plant & Equipment", unit: "day", rate: 680.00, supplier: "Plant Hire UK", wastage: 0, lastUpdated: "2024-09-28" },
];

export default function RatesPage() {
  const [activeTab, setActiveTab] = useState("All Materials");

  const filtered = activeTab === "All Materials" ? materials : materials.filter(m => m.category === activeTab);

  return (
    <>
      <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center w-full h-10 shrink-0 px-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-[18px]">database</span>
          <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-tight">TBEC QMX</span>
          <span className="text-outline mx-1 font-body-sm text-body-sm">/</span>
          <span className="font-data-mono text-data-mono text-secondary lowercase">material-rate-master</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none">
            <span className="material-symbols-outlined text-[20px]">help</span>
          </button>
          <div className="w-7 h-7 ml-1 rounded-none bg-primary-container flex items-center justify-center text-on-primary font-data-mono text-data-mono">
            JD
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-headline text-headline text-on-surface">Material Rate Master</h1>
            <p className="font-body-sm text-body-sm text-secondary mt-0.5">Global pricing directory with wastage coefficients and supplier contracts.</p>
          </div>
          <button className="px-3 py-1.5 bg-primary-container text-on-primary font-label-caps text-label-caps hover:bg-primary transition-colors rounded-none flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Material
          </button>
        </div>
        <div className="flex gap-1 border-b border-outline-variant">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-label-caps text-label-caps uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === tab
                  ? "text-primary border-primary-container"
                  : "text-on-surface-variant border-transparent hover:text-on-surface hover:border-outline-variant"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <section className="bg-surface-container-lowest border border-outline-variant rounded-none overflow-hidden flex-1 flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-dim border-b border-outline-variant sticky top-0">
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Code</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Material / Resource</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Unit</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant text-right">Rate ($)</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Supplier</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant text-right">Wastage %</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => (
                  <tr key={m.code} className={`h-8 border-b border-outline-variant/30 hover:bg-surface-container-highest transition-colors cursor-pointer ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low'}`}>
                    <td className="px-3 font-data-mono text-data-mono text-primary">{m.code}</td>
                    <td className="px-3 font-body-sm text-body-sm text-on-surface">{m.name}</td>
                    <td className="px-3 font-data-mono text-data-mono text-on-surface-variant">{m.unit}</td>
                    <td className="px-3 font-data-mono text-data-mono text-on-surface text-right">{m.rate.toFixed(2)}</td>
                    <td className="px-3 font-body-sm text-body-sm text-secondary">{m.supplier}</td>
                    <td className="px-3 font-data-mono text-data-mono text-on-surface text-right">{m.wastage > 0 ? `${m.wastage}%` : '—'}</td>
                    <td className="px-3 font-data-mono text-data-mono text-on-surface-variant">{m.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
