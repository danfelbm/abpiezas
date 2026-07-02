import Link from "next/link";
import { visibleCanvases } from "../lib/canvases";

export default function Home() {
  return (
    <div className="home">
      <h1>canvasbm</h1>
      <p className="lead">Canvas de piezas de campaña.</p>
      {visibleCanvases().map((c) => (
        <Link key={c.slug} href={`/c/${c.slug}/`} className="home-card">
          <h2>{c.title}</h2>
          {c.subtitle && <span>{c.subtitle}</span>}
        </Link>
      ))}
    </div>
  );
}
