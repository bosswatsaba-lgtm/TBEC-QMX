export default function Home() {
  const screens = [
    {
      id: "tenant-dashboard",
      number: "01",
      label: "Tenant Management & Project Overview",
      href: "/dashboard",
      description:
        "Multi-tenant company selection, project phases, and WBS lifecycle management across active tenders.",
      metrics: ["8 active tenders", "3 WBS phases live", "12 org units synced"],
    },
    {
      id: "takeoff",
      number: "02",
      label: "Digital Blueprint Takeoff Workspace",
      href: "/takeoff",
      description:
        "Vector trace canvas with direct SMM7 / CESMM4 measurement code mapping for structural and civil works.",
      metrics: ["Class E: Excavation", "Class F: Concrete (C25)", "Class R: Roads"],
    },
    {
      id: "boq",
      number: "03",
      label: "Live Bill of Quantities Ledger",
      href: "/boq",
      description:
        "Calculated item lists grouped by method of measurement, with provisional sums and daywork schedules ready for legal tender export.",
      metrics: ["1,240 billed items", "£2.4M est. value", "SMM7 Sec. 2–21"],
    },
    {
      id: "rates",
      number: "04",
      label: "Material Rate Master",
      href: "/rates",
      description:
        "Global pricing directory with wastage coefficients, supplier contracts, and single-source-of-truth cost controls for procurement.",
      metrics: ["340 materials indexed", "12 supplier contracts", "Avg. 8.2% wastage"],
    },
  ] as const;

  return (
    <div className="flex min-h-full">
      <aside className="flex w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-6 dark:border-zinc-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-sm font-bold text-zinc-950">
            Q
          </div>
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            TBEC QMX
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {screens.map((s) => (
            <a
              key={s.id}
              href={s.href}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-xs font-mono font-medium text-zinc-600 transition-colors group-hover:bg-amber-100 group-hover:text-amber-700 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-amber-900/40 dark:group-hover:text-amber-400">
                {s.number}
              </span>
              <span>{s.label}</span>
            </a>
          ))}
        </nav>
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">sys.online</span>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-10 dark:border-zinc-800 dark:bg-zinc-950">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Quantity Measurement & Exchange
            </h1>
            <p className="text-xs text-zinc-400">
              TBEC Engineering Group — Tender Platform
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              <option>Demo Corp — HQ</option>
              <option>Demo Corp — Region A</option>
            </select>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-8 overflow-y-auto bg-zinc-50 p-10 dark:bg-black">
          <section>
            <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400">
              Platform Modules
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-5">
              {screens.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  className="group block rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-amber-400 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-amber-600"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-xs font-mono font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {s.number}
                    </span>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {s.label}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {s.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400">
              Standards Reference
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">SMM7</span>
                <p className="mt-1 text-xs text-zinc-400">
                  Standard Method of Measurement — 7th Edition
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">CESMM4</span>
                <p className="mt-1 text-xs text-zinc-400">
                  Civil Engineering Standard Method — 4th Edition
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">WBS</span>
                <p className="mt-1 text-xs text-zinc-400">
                  Work Breakdown Structure — Phased Delivery
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="flex h-10 items-center justify-between border-t border-zinc-200 bg-white px-10 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} TBEC Engineering Group
          </span>
          <span className="text-xs text-zinc-400">QMX v0.1.0 — Development Build</span>
        </footer>
      </div>
    </div>
  );
}
