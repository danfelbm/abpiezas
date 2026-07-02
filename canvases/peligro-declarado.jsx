'use client';

// Canvas "Peligro declarado" — feed 1:1 (antes el index.html del repo estático).
// Los IDs de sección/artboard se conservan idénticos a la versión anterior.

import { DesignCanvas, DCSection, DCArtboard } from "../components/canvas/DesignCanvas";
import { PiezaRoja, PiezaFicha } from "../components/pieces/Piezas";
import { PIEZAS } from "../data/piezas";

const LABELS = ["Pensar distinto", "Protesta", "Paramilitarismo", "Falsos positivos", "Justicia de paz", "Veedores intl."];

export default function PeligroDeclarado() {
  const p1 = PIEZAS[0];
  return (
    <DesignCanvas slug="peligro-declarado">
      <DCSection id="dir" title="Decisión de dirección — Pieza 01" subtitle="Misma pieza, dos jerarquías. ¿Foto traslúcida fundida en el rojo, o foto como ficha de expediente?">
        <DCArtboard id="dirA" label="A · Foto traslúcida · rojo dominante" width={1080} height={1080}>
          <PiezaRoja p={p1} />
        </DCArtboard>
        <DCArtboard id="dirB" label="B · Foto como ficha" width={1080} height={1080}>
          <PiezaFicha p={p1} />
        </DCArtboard>
      </DCSection>

      <DCSection id="serieA" title="Serie completa — Dirección A (rojo dominante)" subtitle="La denuncia es el héroe; el retrato va traslúcido dentro del rojo; su frase queda como prueba.">
        {PIEZAS.map((p, i) => (
          <DCArtboard key={p.n} id={"a" + p.n} label={String(p.n).padStart(2, "0") + " · " + LABELS[i]} width={1080} height={1080}>
            <PiezaRoja p={p} />
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection id="serieB" title="Serie completa — Dirección B (foto como ficha)" subtitle="Mismo mensaje con el retrato reducido a evidencia de expediente.">
        {PIEZAS.map((p, i) => (
          <DCArtboard key={p.n} id={"b" + p.n} label={String(p.n).padStart(2, "0") + " · " + LABELS[i]} width={1080} height={1080}>
            <PiezaFicha p={p} />
          </DCArtboard>
        ))}
      </DCSection>
    </DesignCanvas>
  );
}
