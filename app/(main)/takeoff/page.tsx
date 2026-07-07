"use client";

import { useState } from "react";

const phases = ["Substructure", "Superstructure", "Finishes"];

const measurements = [
  { id: "L-042", name: "Foundation Wall A", phase: "Substructure", code: "F10.111", value: "45.2 m", active: true },
  { id: "A-012", name: "Slab Area Z1", phase: "Substructure", code: "E10.1", value: "124.5 m²", active: false },
  { id: "V-003", name: "Pier Excavation", phase: "Substructure", code: "D20.2", value: "18.2 m³", active: false },
  { id: "L-018", name: "Beam B3 Span", phase: "Superstructure", code: "F20.1", value: "8.4 m", active: false },
];

export default function TakeoffPage() {
  const [activePhase, setActivePhase] = useState("Substructure");

  return (
    <>
      <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center w-full h-10 shrink-0 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-[18px]">polyline</span>
            <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-tight">TBEC QMX</span>
          </div>
          <div className="ml-4 flex items-center bg-surface-container-low border border-outline-variant">
            {phases.map((p) => (
              <button
                key={p}
                onClick={() => setActivePhase(p)}
                className={`px-3 py-1 flex items-center gap-2 text-body-sm font-body-sm transition-colors ${
                  activePhase === p
                    ? "text-primary font-bold bg-surface-container-lowest border-b-2 border-primary-container"
                    : "text-on-surface-variant font-medium hover:bg-surface-container-high"
                }`}
              >
                <div className={`w-2 h-2 ${activePhase === p ? "bg-primary-container" : "border border-outline-variant"}`}></div>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none">
            <span className="material-symbols-outlined text-[20px]">help</span>
          </button>
          <div className="w-7 h-7 ml-1 rounded-none bg-primary-container flex items-center justify-center text-on-primary font-data-mono text-data-mono">
            JD
          </div>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <section className="flex-[2] flex flex-col border-r border-outline-variant bg-surface relative">
          <div className="absolute top-4 left-4 z-10 bg-inverse-surface border border-outline-variant p-1 flex flex-col gap-1">
            <button className="p-2 text-secondary-fixed-dim hover:bg-on-secondary-fixed-variant hover:text-primary-fixed transition-colors rounded-none" title="Set Scale">
              <span className="material-symbols-outlined text-[18px]">straighten</span>
            </button>
            <div className="w-full h-px bg-outline-variant my-0.5"></div>
            <button className="p-2 text-primary-fixed bg-on-secondary-fixed-variant border-l-2 border-primary-container" title="Linear Measurement">
              <span className="material-symbols-outlined text-[18px]">timeline</span>
            </button>
            <button className="p-2 text-secondary-fixed-dim hover:bg-on-secondary-fixed-variant hover:text-primary-fixed transition-colors rounded-none" title="Area Measurement">
              <span className="material-symbols-outlined text-[18px]">format_shapes</span>
            </button>
            <button className="p-2 text-secondary-fixed-dim hover:bg-on-secondary-fixed-variant hover:text-primary-fixed transition-colors rounded-none" title="Point Count">
              <span className="material-symbols-outlined text-[18px]">scatter_plot</span>
            </button>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-8" style={{
            backgroundSize: "40px 40px",
            backgroundImage: "linear-gradient(to right, #dae2fd 1px, transparent 1px), linear-gradient(to bottom, #dae2fd 1px, transparent 1px)",
          }}>
            <div className="relative max-w-full max-h-full border border-outline-variant bg-white p-2">
              <div className="w-[480px] h-[360px] bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-body-sm text-body-sm">
                Blueprint Viewer — Drop DWG/PDF here
              </div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                <path d="M 120,180 L 320,180 L 320,420" fill="none" stroke="#f97316" strokeDasharray="4,4" strokeWidth="2"></path>
                <circle cx="120" cy="180" fill="#f97316" r="4"></circle>
                <circle cx="320" cy="180" fill="#f97316" r="4"></circle>
                <circle cx="320" cy="420" fill="#f97316" r="4"></circle>
                <rect x="295" y="290" width="50" height="20" fill="rgba(255,255,255,0.9)" stroke="#f97316" strokeWidth="1"></rect>
                <text x="320" y="304" fill="#131b2e" fontFamily="Inter" fontSize="10" textAnchor="middle">12.5m</text>
              </svg>
            </div>
          </div>
          <div className="h-8 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between px-3 font-data-mono text-data-mono text-secondary">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary-container"></span> Scale: 1:100</span>
              <span>Snap: ON</span>
            </div>
            <div className="flex items-center gap-2">
              <span>X: 1450.2</span>
              <span>Y: -820.5</span>
            </div>
          </div>
        </section>
        <section className="flex-1 flex flex-col bg-surface-container-lowest">
          <div className="p-3 border-b border-outline-variant bg-surface-container flex justify-between items-center">
            <h2 className="font-headline text-headline text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-tertiary">list_alt</span>
              Takeoff Stream
            </h2>
            <button className="bg-primary-container text-on-primary font-label-caps text-label-caps px-2 py-1 hover:bg-primary transition-colors flex items-center gap-1 rounded-none">
              <span className="material-symbols-outlined text-[14px]">add</span> NEW
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {measurements.map((m) => (
              <div key={m.id} className={`border ${m.active ? "border-primary-container bg-surface-container-low" : "border-outline-variant bg-white"} p-2 relative`}>
                {m.active && <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>}
                <div className="flex justify-between items-start mb-2 pl-2">
                  <div>
                    <span className="font-data-mono text-data-mono bg-surface-dim text-on-surface px-1 py-0.5">{m.id}</span>
                    <span className={`font-body-sm text-body-sm ml-2 ${m.active ? "font-semibold" : ""}`}>{m.name}</span>
                  </div>
                  <span className={`font-data-mono text-data-mono ${m.active ? "text-primary-container font-bold" : "text-on-surface"}`}>{m.value}</span>
                </div>
                {m.active ? (
                  <div className="grid grid-cols-2 gap-2 mt-2 pl-2">
                    <div>
                      <label className="text-[10px] text-secondary uppercase tracking-wider mb-1 block">Phase</label>
                      <select className="w-full font-data-mono text-data-mono border-outline-variant py-1 px-2 bg-white rounded-none focus:border-primary-container focus:ring-0">
                        <option>Substructure</option>
                        <option>Superstructure</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-secondary uppercase tracking-wider mb-1 block">SMM7 Code</label>
                      <select className="w-full font-data-mono text-data-mono border-outline-variant py-1 px-2 bg-white rounded-none focus:border-primary-container focus:ring-0">
                        <option>E10.1</option>
                        <option>F10.111</option>
                        <option>F10.2</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-1 pl-2">
                    <span className="bg-surface-variant px-1 font-body-sm text-body-sm text-secondary">{m.phase}</span>
                    <span className="bg-surface-variant px-1 font-body-sm text-body-sm text-secondary">{m.code}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-outline-variant bg-surface-container-low">
            <div className="flex justify-between items-center font-body-sm text-body-sm">
              <span className="text-secondary">Items ({activePhase}):</span>
              <span className="font-bold text-on-surface">{measurements.filter(m => m.phase === activePhase).length}</span>
            </div>
            <div className="w-full bg-outline-variant h-1 mt-2 overflow-hidden">
              <div className="bg-primary-container h-full w-[45%]"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
