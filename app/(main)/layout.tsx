const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "folder" },
  { label: "Takeoff Canvas", href: "/takeoff", icon: "architecture" },
  { label: "BoQ Generator", href: "/boq", icon: "list_alt" },
  { label: "Material Master", href: "/rates", icon: "database" },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-surface font-body-lg">
      <aside className="bg-inverse-surface w-[240px] flex flex-col shrink-0 border-r border-outline border-t-0 fixed left-0 top-0 bottom-0 z-40">
        <div className="px-4 py-4 border-b border-on-surface-variant/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-none bg-primary-container flex items-center justify-center text-on-primary font-headline text-headline shrink-0">
            TE
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-primary-fixed font-headline text-headline truncate">TBEC QMX</span>
            <span className="text-secondary-fixed-dim font-label-caps text-label-caps uppercase tracking-wider mt-0.5">Estimator</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 text-secondary-fixed-dim hover:text-primary-fixed hover:bg-on-secondary-fixed-variant/40 transition-colors border-l-[3px] border-transparent hover:border-primary-container"
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="border-t border-on-surface-variant/30 py-2">
          <a href="/" className="flex items-center gap-3 px-4 py-2.5 text-secondary-fixed-dim hover:text-primary-fixed hover:bg-on-secondary-fixed-variant/40 transition-colors">
            <span className="material-symbols-outlined text-[20px]">exit_to_app</span>
            <span className="font-label-caps text-label-caps uppercase tracking-wider">Exit</span>
          </a>
        </div>
      </aside>
      <main className="ml-[240px] flex-1 flex flex-col min-h-screen bg-surface-container-low">
        {children}
      </main>
    </div>
  );
}
