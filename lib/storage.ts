import type { CanvasStateStore, CanvasUIState } from "./types";

const key = (slug: string) => `dc-state:${slug}`;

export const canvasStateStore: CanvasStateStore = {
  async load(slug: string): Promise<CanvasUIState | null> {
    try {
      const raw = localStorage.getItem(key(slug));
      return raw ? (JSON.parse(raw) as CanvasUIState) : null;
    } catch {
      return null;
    }
  },
  async save(slug: string, state: CanvasUIState): Promise<void> {
    try {
      localStorage.setItem(key(slug), JSON.stringify(state));
    } catch {}
  },
};
