# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

**canvasbm** es un visor de piezas gráficas de campaña estilo Figma: un canvas infinito con pan/zoom donde cada "artboard" muestra una pieza a tamaño real (1080×1080, 1080×1920, etc.). Es Next.js (App Router) con **export estático** (`output: 'export'`) — no hay backend ni API routes; el deploy es la carpeta `out/`. Está prevista una integración futura con Supabase (ver "Persistencia").

## Comandos

```bash
npm run dev        # dev server (el dueño del repo prefiere lanzarlo él mismo — no lo dejes corriendo)
npm run build      # genera el export estático en out/ — ÚSALO como validación principal
python3 -m http.server 8321 -d out   # smoke test del build real (mata el proceso al terminar)
```

No hay tests ni linter configurados. La validación es `npm run build` (que revienta ante accesos a `window` en render — ver Gotchas) más inspección en navegador.

## Arquitectura

### Motor del canvas — `components/canvas/`

Todo es `'use client'`. El motor era un solo archivo (`design-canvas.jsx` del repo original, ver historial git) hoy partido en módulos:

- **`DesignCanvas.jsx`** — orquestador. Recibe `slug` y children declarativos (`DCSection` > `DCArtboard`). Recorre los children **por tipo de componente** (patrón marker: `DCArtboard` renderiza `null`; quien pinta es `DCArtboardFrame` vía `DCSection`) para construir el registro de artboards que usa el focus overlay. Posee el estado editable por sección (order/labels/hidden/título renombrado).
- **`DCViewport.jsx`** — pan/zoom. El transform vive en un ref y se escribe **directo al DOM** (`translate3d + scale`), sin pasar por estado de React, para mantener 60fps. Mapea rueda/trackpad/gestos Safari en desktop y, en touch, 1 dedo = pan, 2 dedos = pinch (Map de pointers activos). No conviertas esto a estado React.
- **`dcCore.js`** — tokens `DC`, contexto `DCCtx` y `dcFlatten` (desanida Fragments para el walk por tipos).
- **`DCSection.jsx`** — sección + frame de artboard (drag-reorder por grip, menú kebab con export/delete, rename inline).
- **`DCFocusOverlay.jsx`** — vista fullscreen de un artboard (flechas/teclado en desktop, swipe en móvil).
- **`dcExport.js`** — export PNG/HTML autocontenido (clona el nodo con computed styles + data URIs, PNG vía foreignObject→canvas a 3×).
- **`dc.css`** — el chrome del canvas (clases `dc-`). El chrome contra-escala con `--dc-inv-zoom` (variable que `DCViewport` actualiza en cada frame) para mantener tamaño constante en pantalla a cualquier zoom — si añades UI flotante dentro del mundo, úsala.

### Multi-canvas y rutas

- **`lib/canvases.tsx`** es el registry: array `CANVASES` de `{ slug, title, subtitle?, hidden?, Component }`.
- **`app/c/[slug]/page.tsx`** genera una página estática por entrada (`generateStaticParams` incluye **también los hidden** — esa es la semántica de "oculto": fuera del sidebar (`components/shell/Sidebar.tsx`) y del índice (`app/page.tsx`), pero la URL directa funciona).
- **`components/shell/AppShell.tsx`** — sidebar fijo en desktop, drawer con hamburguesa en ≤768px. El índice `/` se renderiza sin shell.

### Persistencia (seam para Supabase)

Las ediciones del usuario (reordenar, renombrar, borrar artboards, títulos de sección) persisten vía la interfaz **`CanvasStateStore`** (`lib/types.ts`), implementada hoy con localStorage en `lib/storage.ts` (clave `dc-state:<slug>`; el viewport aparte en `dc-viewport:<slug>`). La integración con Supabase debe reimplementar esa interfaz sin tocar el motor.

Semántica clave: cada sección guarda un `srcKey` (los IDs de sus artboards unidos por `\x1f`). Si el set de artboards del código cambia, los `hidden` guardados se invalidan solos. Por eso **los IDs de sección y artboard deben ser estables** — son las claves de persistencia; renombrarlos descarta el estado guardado de los usuarios.

## Cómo añadir un canvas nuevo

1. Crea `canvases/mi-canvas.jsx`:

```jsx
'use client';
import { DesignCanvas, DCSection, DCArtboard } from "../components/canvas/DesignCanvas";

export default function MiCanvas() {
  return (
    <DesignCanvas slug="mi-canvas">   {/* mismo slug que en el registry */}
      <DCSection id="intro" title="Mi sección" subtitle="Opcional">
        <DCArtboard id="a1" label="01 · Variante A" width={1080} height={1080}>
          {/* contenido de la pieza */}
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}
```

2. Regístralo en `lib/canvases.tsx` (añade `hidden: true` si no debe listarse en sidebar/índice).

Eso es todo — la ruta `/c/mi-canvas/` y la entrada del sidebar salen del registry. Los datos de las piezas actuales viven en `data/piezas.ts` y sus componentes en `components/pieces/`.

## Gotchas

- **`window`/`localStorage` solo dentro de effects o lazy initializers.** Los client components se prerenderizan durante `npm run build`; un acceso en render rompe el build (no el dev). Es el error más probable al tocar el motor.
- **Los artboards son frames de diseño estáticos, no regiones de scroll**: nunca `height:100%` + `overflow:auto` en su contenido; dimensiona cada artboard a su contenido con píxeles explícitos.
- **Assets con rutas absolutas** (`/img/...`, `/noise.svg` — también dentro del CSS): las páginas viven bajo `/c/<slug>/` y una ruta relativa se rompe. Imágenes con `<img>` normal, no `next/image` (aporta nada en export estático con frames a píxel fijo).
- **CSS de piezas es global** (`styles/pieza.css`, `styles/stories.css`, importados en `app/layout.tsx`); las clases del chrome del canvas llevan prefijo `dc-` para no colisionar. `stories.css` hereda tokens de `pieza.css` y debe cargarse después.
- El repo original (HTML estático + React UMD por CDN) está en el historial de git anterior al commit de migración, por si hay que consultar el comportamiento de referencia.
