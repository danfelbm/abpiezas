'use client';

// Canvas "Stories 9:16" — versiones 1080×1920 para Instagram Stories.
// Oculto (hidden en el registry): accesible solo por URL directa.

import { DesignCanvas, DCSection, DCArtboard } from "../components/canvas/DesignCanvas";
import { StoryRoja, StoryFicha } from "../components/pieces/Stories";
import { PIEZAS } from "../data/piezas";

const LABELS = ["Pensar distinto", "Protesta", "Paramilitarismo", "Falsos positivos", "Justicia de paz", "Veedores intl."];

export default function StoriesCanvas() {
  return (
    <DesignCanvas slug="stories">
      <DCSection id="storiesA" title="Stories — Dirección A (rojo dominante)" subtitle="9:16 · 1080×1920 · foto traslúcida fundida en el rojo.">
        {PIEZAS.map((p, i) => (
          <DCArtboard key={p.n} id={"sa" + p.n} label={String(p.n).padStart(2, "0") + " · " + LABELS[i]} width={1080} height={1920}>
            <StoryRoja p={p} />
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection id="storiesB" title="Stories — Dirección B (foto como ficha)" subtitle="9:16 · 1080×1920 · retrato reducido a evidencia de expediente.">
        {PIEZAS.map((p, i) => (
          <DCArtboard key={p.n} id={"sb" + p.n} label={String(p.n).padStart(2, "0") + " · " + LABELS[i]} width={1080} height={1920}>
            <StoryFicha p={p} />
          </DCArtboard>
        ))}
      </DCSection>
    </DesignCanvas>
  );
}
