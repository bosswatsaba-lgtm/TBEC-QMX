const projects = [
  { name: "Apex Tower Foundation", location: "Seattle, WA", modified: "Oct 24, 09:15 AM", status: "Calculating", statusClass: "bg-tertiary-container text-on-tertiary-container border-tertiary/20" },
  { name: "Riverside Industrial Park", location: "Portland, OR", modified: "Oct 23, 16:42 PM", status: "Draft", statusClass: "bg-secondary-container text-on-secondary-container border-secondary/20" },
  { name: "Horizon Medical Center Wing B", location: "Austin, TX", modified: "Oct 21, 11:05 AM", status: "Ready", statusClass: "bg-surface-variant text-primary border-primary/30" },
  { name: "Oakridge Elementary Renovation", location: "Denver, CO", modified: "Oct 20, 14:30 PM", status: "Ready", statusClass: "bg-surface-variant text-primary border-primary/30" },
  { name: "Central Hub Infrastructure Phase 1", location: "Chicago, IL", modified: "Oct 18, 08:22 AM", status: "Revision", statusClass: "bg-error/10 text-error border-error/30" },
];

const phases = [
  { name: "Earthworks", pct: 100, status: "Complete", quantified: "", color: "bg-primary-container" },
  { name: "Substructure", pct: 85, status: "8,450 / 9,941 m³", quantified: "Quantified", color: "bg-primary-container" },
  { name: "Superstructure", pct: 20, status: "1,200 / 6,000 m³", quantified: "Quantified", color: "bg-primary-container" },
  { name: "Roofing", pct: 0, status: "Pending", quantified: "", color: "bg-tertiary-container" },
  { name: "Finishes", pct: 0, status: "Pending", quantified: "", color: "bg-tertiary-container" },
];

export default function DashboardPage() {
  return (
    <>
      <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center w-full h-10 shrink-0 px-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-[18px]">dataset</span>
          <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-tight">TBEC QMX</span>
          <span className="text-outline mx-1 font-body-sm text-body-sm">/</span>
          <span className="font-data-mono text-data-mono text-secondary lowercase">dashboard</span>
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
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-headline text-headline text-on-surface">Organization Dashboard</h1>
            <p className="font-body-sm text-body-sm text-secondary mt-0.5">Manage cross-project analytics and initialize new quantification workflows.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-none flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-body-sm text-secondary">Active Organization Projects</span>
              <span className="material-symbols-outlined text-tertiary text-[18px]">account_tree</span>
            </div>
            <div className="font-display text-display text-on-surface mt-2">14</div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-none flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-body-sm text-secondary">Total Quantified Cost</span>
              <span className="material-symbols-outlined text-tertiary text-[18px]">account_balance_wallet</span>
            </div>
            <div className="font-display text-display text-on-surface mt-2 flex items-baseline gap-1">
              <span className="font-body-lg text-body-lg text-outline">$</span>124.5<span className="font-headline text-headline text-outline">M</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-none flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-body-sm text-secondary">Team Members Active</span>
              <span className="material-symbols-outlined text-tertiary text-[18px]">group</span>
            </div>
            <div className="font-display text-display text-on-surface mt-2">32</div>
          </div>
        </div>
        <section className="bg-surface-container-lowest border border-outline-variant rounded-none overflow-hidden">
          <div className="bg-surface-container border-b border-outline-variant px-4 py-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">analytics</span>
            <h2 className="font-headline text-headline text-on-surface">Active Project Phase Completion</h2>
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-error-container text-error font-label-caps text-label-caps rounded-none">
              <span className="w-1.5 h-1.5 bg-error rounded-full"></span>LIVE
            </span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {phases.map((p) => (
                <div key={p.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="font-headline text-headline text-on-surface">{p.name}</span>
                    <span className="font-data-mono text-data-mono text-primary">{p.pct}%</span>
                  </div>
                  <div className="h-2 bg-surface-container-high rounded-none overflow-hidden">
                    <div className={`h-full ${p.color} w-[${p.pct}%]`}></div>
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary uppercase tracking-wider">{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-surface-container-lowest border border-outline-variant rounded-none overflow-hidden flex-1 flex flex-col">
          <div className="bg-surface-container border-b border-outline-variant px-4 py-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">list_alt</span>
            <h2 className="font-headline text-headline text-on-surface">Recent Estimations Portfolio</h2>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-dim border-b border-outline-variant">
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Project Name</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Location</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Date Modified</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant">Status</th>
                  <th className="py-2 px-3 font-label-caps text-label-caps text-on-surface-variant text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={p.name} className={`h-8 border-b border-outline-variant/30 hover:bg-surface-container-highest transition-colors cursor-pointer ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low'}`}>
                    <td className="px-3 font-body-lg text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px] text-outline">article</span>
                      {p.name}
                    </td>
                    <td className="px-3 font-data-mono text-data-mono text-on-surface-variant">{p.location}</td>
                    <td className="px-3 font-data-mono text-data-mono text-on-surface-variant">{p.modified}</td>
                    <td className="px-3">
                      <span className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-label-caps uppercase border ${p.statusClass}`}>{p.status}</span>
                    </td>
                    <td className="px-3 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                      </button>
                    </td>
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
