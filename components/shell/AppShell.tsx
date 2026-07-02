'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // El índice (/) es una página normal con su propio layout — sin sidebar.
  if (pathname === "/") return <>{children}</>;

  return (
    <div className={"shell" + (open ? " drawer-open" : "")}>
      <Sidebar onNavigate={() => setOpen(false)} />
      <button className="sidebar-backdrop" aria-label="Cerrar menú" onClick={() => setOpen(false)} />
      <button className="sidebar-toggle" aria-label="Abrir menú" onClick={() => setOpen(true)}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>
      <main className="shell-main">{children}</main>
    </div>
  );
}
