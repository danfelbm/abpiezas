'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { visibleCanvases } from "../../lib/canvases";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="sidebar">
      <Link href="/" className="sidebar-brand" onClick={onNavigate}>
        <span className="name">Canvas</span>
        <span className="project">Proyecto Cajar</span>
      </Link>
      {visibleCanvases().map((c) => {
        const href = `/c/${c.slug}/`;
        const active = pathname === href || pathname === href.slice(0, -1);
        return (
          <Link key={c.slug} href={href} className={"sidebar-item" + (active ? " active" : "")} onClick={onNavigate}>
            {c.title}
            {c.subtitle && <span className="sub">{c.subtitle}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
