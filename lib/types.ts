import type React from "react";

// → futura tabla `canvases` en Supabase
export interface CanvasMeta {
  slug: string;
  title: string;
  subtitle?: string;
  // No aparece en sidebar ni en el índice, pero su URL directa sí funciona.
  hidden?: boolean;
}

export interface CanvasEntry extends CanvasMeta {
  Component: React.ComponentType;
}

// Misma semántica del sidecar .design-canvas.state.json original.
export interface SectionState {
  title?: string;
  order?: string[];
  labels?: Record<string, string>;
  hidden?: string[];
  // Invalida `hidden` cuando cambia el set de artboards de la fuente.
  srcKey?: string;
}

export interface CanvasUIState {
  sections: Record<string, SectionState>;
}

// Seam de persistencia: hoy localStorage, mañana Supabase con la misma interfaz.
export interface CanvasStateStore {
  load(slug: string): Promise<CanvasUIState | null>;
  save(slug: string, state: CanvasUIState): Promise<void>;
}
