import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CANVASES, getCanvas } from "../../../lib/canvases";

// TODOS los slugs, incluidos los hidden: su HTML se genera igual, así la URL
// directa funciona aunque no aparezcan en sidebar ni en el índice.
export function generateStaticParams() {
  return CANVASES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const canvas = getCanvas(slug);
  return { title: canvas ? `${canvas.title} · canvasbm` : "canvasbm" };
}

export default async function CanvasPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canvas = getCanvas(slug);
  if (!canvas) notFound();
  const { Component } = canvas;
  return <Component />;
}
