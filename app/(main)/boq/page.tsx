const boqItems = [
  { code: "E10.1", description: "Excavation of foundation trenches, depth >1.0m ≤2.0m", unit: "m³", quantity: 8450, rate: 12.50, total: 105625 },
  { code: "F10.111", description: "Reinforced concrete C25/30 in foundation walls", unit: "m³", quantity: 3200, rate: 185.00, total: 592000 },
  { code: "F20.1", description: "Steel reinforcement bar Ø12mm (Grade B500B)", unit: "t", quantity: 124.5, rate: 890.00, total: 110805 },
  { code: "D20.2", description: "Earthwork fill to structures — imported granular", unit: "m³", quantity: 2180, rate: 28.75, total: 62675 },
  { code: "R10.1", description: "Structural steel framing — universal beams UB 533×210", unit: "t", quantity: 48.2, rate: 2150.00, total: 103630 },
  { code: "E30.1", description: "Disposal of excavated material off-site", unit: "m³", quantity: 5600, rate: 18.50, total: 103600 },
  { code: "F30.2", description: "Formwork to vertical faces of walls (height ≤ 4m)", unit: "m²", quantity: 4200, rate: 42.00, total: 176400 },
  { code: "K10.1", description: "Brick/block walling — 200mm hollow concrete block", unit: "m²", quantity: 1850, rate: 68.00, total: 125800 },
];

const grandTotal = boqItems.reduce((sum, i) => sum + i.total, 0);

export default function BoqPage() {
  return (
    <>
      <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center w-full h-10 shrink-0 px-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-[18px]">library_books</span>
          <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-tight">TBEC QMX</span>
          <span className="text-outline mx-1 font-body-sm text-body-sm">/</span>
          <span className="font-data-mono text-data-mono text-secondary lowercase">boq-generator</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-none">
            <span className="material-symbols-outlined text-[20px]">print</span>
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
            <h1 className="font-headline text-headline text-on-surface">Live Bill of Quantities</h1>
            <p className="font-body-sm text-body-sm text-secondary mt-0.5">Calculated item lists grouped by SMM7 method of measurement.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-outline-variant bg-surface text-on-surface font-label-caps text-label-caps hover:bg-surface-container-high transition-colors rounded-none flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Filter
            </button>
            <button className="px-3 py-1.5 bg-primary-container text-on-primary font-label-caps text-label-caps hover:bg-primary transition-colors rounded-none flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="bg-surface-container-lowest border border-outline-variant p-3 rounded-none flex flex-col">
            <span className="font-body-sm text-body-sm text-secondary">Total Items</span>
            <span className="font-display text-display text-on-surface mt-1">{boqItems.length}</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-3 rounded-none flex flex-col">
            <span className="font-body-sm text-body-sm text-secondary">Measured Quantities</span>
            <span className="font-display text-display text-on-surface mt-1">27,652</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-3 rounded-none flex flex-col">
            <span className="font-body-sm text-body-sm text-secondary">Grand Total (USD)</span>
            <span className="font-display text-display text-on-surface mt-1 font-data-mono">${grandTotal.toLocaleString()}</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-3 rounded-none flex flex-col">
            <span className="font-body-sm text-body-sm text-secondary">Export Format</span>
            <span className="font-display text-display text-on-surface mt-1 flex items-center gap-2">
              <select className="text-body-lg font-body-lg bg-transparent border border-outline-variant px-2 py-0.5 rounded-none">
                <option>SMM7</option>
                <option>CESMM4</option>
                <option>NRM2</option>
              </select>
            </span>
          </div>
        </div>
        <section className="bg-surface-container-lowest border border-outline-variant rounded-none overflow-hidden flex-1 flex flex-col">
          <div className="bg-surface-container border-b border-outline-variant px-4 py-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">table_chart</span>
            <h2 className="font-headline text-headline text-on-surface">SMM7 Bill Items</h2>
            <span className="ml-auto font-data-mono text-data-mono text-secondary">{boqItems.length} items</span>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-dim border-b border-outline-variant">
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant w-[90px]">Code</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Description</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant w-[60px]">Unit</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant text-right w-[100px]">Quantity</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant text-right w-[100px]">Rate ($)</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant text-right w-[120px]">Total ($)</th>
                </tr>
              </thead>
              <tbody>
                {boqItems.map((item, i) => (
                  <tr key={item.code} className={`h-8 border-b border-outline-variant/30 hover:bg-surface-container-highest transition-colors ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low'}`}>
                    <td className="px-3 font-data-mono text-data-mono text-primary">{item.code}</td>
                    <td className="px-3 font-body-sm text-body-sm text-on-surface">{item.description}</td>
                    <td className="px-3 font-data-mono text-data-mono text-on-surface-variant">{item.unit}</td>
                    <td className="px-3 font-data-mono text-data-mono text-on-surface text-right">{item.quantity.toLocaleString()}</td>
                    <td className="px-3 font-data-mono text-data-mono text-on-surface text-right">{item.rate.toFixed(2)}</td>
                    <td className="px-3 font-data-mono text-data-mono text-on-surface text-right font-semibold">{item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-surface-container border-t-2 border-outline-variant font-semibold">
                  <td colSpan={5} className="px-3 py-2 font-label-caps text-label-caps text-on-surface text-right">Grand Total</td>
                  <td className="px-3 py-2 font-data-mono text-data-mono text-on-surface text-right">${grandTotal.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
