// canvases.tsx — registry de canvas. Por ahora estático en código;
// con Supabase esto pasa a leerse de la tabla `canvases`.

import type { CanvasEntry } from "./types";
import PeligroDeclarado from "../canvases/peligro-declarado";
import ImpuestosSaludables from "../canvases/impuestos-saludables";
import StoriesCanvas from "../canvases/stories";

export const CANVASES: CanvasEntry[] = [
  {
    slug: "peligro-declarado",
    title: "Peligro declarado",
    subtitle: "6 piezas · 2 direcciones · 1:1",
    hidden: true,
    Component: PeligroDeclarado,
  },
  {
    slug: "impuestos-saludables",
    title: "Impuestos saludables",
    subtitle: "10 piezas · post 1:1 y story 9:16",
    Component: ImpuestosSaludables,
  },
  {
    slug: "stories",
    title: "Stories 9:16",
    subtitle: "Versiones 1080×1920 para Instagram",
    hidden: true,
    Component: StoriesCanvas,
  },
];

export const visibleCanvases = () => CANVASES.filter((c) => !c.hidden);
export const getCanvas = (slug: string) => CANVASES.find((c) => c.slug === slug);
