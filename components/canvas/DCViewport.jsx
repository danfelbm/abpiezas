'use client';

// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//   • touch: 1 dedo → pan · 2 dedos → pinch-zoom + pan (midpoint)
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel/touch ticks don't go through React —
// keeps pans at 60fps on dense canvases.

import React from "react";
import { DC } from "./dcCore";

export function DCViewport({ slug, children, minScale = 0.1, maxScale = 8, style = {} }) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({ x: 0, y: 0, scale: 1 });
  // Persist viewport across reloads so the user lands back where they were.
  // Keyed by canvas slug so each canvas keeps its own viewport.
  const tfKey = "dc-viewport:" + slug;
  const saveT = React.useRef(0);

  const apply = React.useCallback(() => {
    const { x, y, scale } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons).
    el.style.setProperty("--dc-inv-zoom", String(1 / scale));
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try { localStorage.setItem(tfKey, JSON.stringify(tf.current)); } catch {}
    }, 200);
  }, [tfKey]);

  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try { localStorage.setItem(tfKey, JSON.stringify(tf.current)); } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || "null");
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = { x: s.x, y: s.y, scale: Math.min(maxScale, Math.max(minScale, s.scale)) };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener("pagehide", flush);
    return () => { window.removeEventListener("pagehide", flush); flush(); };
  }, []);

  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    // skipDriftFix: durante un pinch táctil zoomAt corre por frame — el
    // anti-drift (elementFromPoint + reflow) es demasiado caro ahí y la
    // corrección se hace al terminar el gesto.
    const zoomAt = (cx, cy, factor, skipDriftFix) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left, py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom. Anchor the DOM element under the cursor instead:
      // record its screen Y, apply the transform, then cancel whatever
      // vertical drift the reflow introduced.
      let marker = null, markerY0 = 0;
      if (k !== 1 && !skipDriftFix) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest("[data-dc-slot],[data-dc-section]") : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) { t.y -= drift; apply(); }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari). Trackpad two-finger scroll sends small/
    // fractional pixel deltas, often with non-zero deltaX. ctrlKey is set by
    // the browser for trackpad pinch.
    const isMouseWheel = (e) =>
      e.deltaMode !== 0 ||
      (e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40);

    const onWheel = (e) => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari desktop sends native gesture* events for trackpad pinch with a
    // smooth e.scale. No-ops on other browsers.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = (e) => { e.preventDefault(); isGesturing = true; gsBase = tf.current.scale; };
    const onGestureChange = (e) => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, (gsBase * e.scale) / tf.current.scale);
    };
    const onGestureEnd = (e) => { e.preventDefault(); isGesturing = false; };

    // ── Pan / pinch por pointer events ──────────────────────────
    // Mouse: middle button anywhere, or primary button on canvas background.
    // Touch: 1 dedo panea (salvo sobre el chrome del artboard), 2 dedos hacen
    // pinch-zoom aunque el segundo caiga sobre un artboard.
    let drag = null;                 // pan con mouse o con 1 dedo
    const touches = new Map();       // pointerId -> {x, y} (solo touch)
    let pinch = null;                // { d, mx, my } del frame anterior

    const midDist = () => {
      const [a, b] = [...touches.values()];
      return {
        mx: (a.x + b.x) / 2,
        my: (a.y + b.y) / 2,
        d: Math.hypot(a.x - b.x, a.y - b.y) || 1,
      };
    };

    const onPointerDown = (e) => {
      if (e.pointerType === "touch") {
        // El chrome interactivo (grip, menú, labels editables) gestiona sus
        // propios gestos — no robarle el pointer.
        if (e.target.closest(".dc-header, .dc-editable, .dc-menu")) return;
        touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
        vp.setPointerCapture(e.pointerId);
        if (touches.size === 2) {
          drag = null;
          pinch = midDist();
        } else if (touches.size === 1) {
          drag = { id: e.pointerId, lx: e.clientX, ly: e.clientY };
        }
        return;
      }
      const onBg = !e.target.closest("[data-dc-slot], .dc-editable");
      if (!(e.button === 1 || (e.button === 0 && onBg))) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = { id: e.pointerId, lx: e.clientX, ly: e.clientY };
      vp.style.cursor = "grabbing";
    };

    const onPointerMove = (e) => {
      if (e.pointerType === "touch" && touches.has(e.pointerId)) {
        touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pinch && touches.size >= 2) {
          const cur = midDist();
          // Pan por el delta del midpoint, luego zoom alrededor del midpoint.
          tf.current.x += cur.mx - pinch.mx;
          tf.current.y += cur.my - pinch.my;
          zoomAt(cur.mx, cur.my, cur.d / pinch.d, true);
          pinch = cur;
          return;
        }
        // sigue al caso drag de abajo
      }
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX; drag.ly = e.clientY;
      apply();
    };

    const onPointerUp = (e) => {
      if (e.pointerType === "touch" && touches.has(e.pointerId)) {
        touches.delete(e.pointerId);
        try { vp.releasePointerCapture(e.pointerId); } catch {}
        if (pinch && touches.size < 2) {
          pinch = null;
          // Con un dedo restante se sigue paneando sin levantar.
          const rest = [...touches.entries()][0];
          drag = rest ? { id: rest[0], lx: rest[1].x, ly: rest[1].y } : null;
        } else if (drag && drag.id === e.pointerId) {
          drag = null;
        }
        return;
      }
      if (!drag || e.pointerId !== drag.id) return;
      try { vp.releasePointerCapture(e.pointerId); } catch {}
      drag = null;
      vp.style.cursor = "";
    };

    vp.addEventListener("wheel", onWheel, { passive: false });
    vp.addEventListener("gesturestart", onGestureStart, { passive: false });
    vp.addEventListener("gesturechange", onGestureChange, { passive: false });
    vp.addEventListener("gestureend", onGestureEnd, { passive: false });
    vp.addEventListener("pointerdown", onPointerDown);
    vp.addEventListener("pointermove", onPointerMove);
    vp.addEventListener("pointerup", onPointerUp);
    vp.addEventListener("pointercancel", onPointerUp);
    return () => {
      vp.removeEventListener("wheel", onWheel);
      vp.removeEventListener("gesturestart", onGestureStart);
      vp.removeEventListener("gesturechange", onGestureChange);
      vp.removeEventListener("gestureend", onGestureEnd);
      vp.removeEventListener("pointerdown", onPointerDown);
      vp.removeEventListener("pointermove", onPointerMove);
      vp.removeEventListener("pointerup", onPointerUp);
      vp.removeEventListener("pointercancel", onPointerUp);
    };
  }, [apply, minScale, maxScale]);

  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return (
    <div
      ref={vpRef}
      className="design-canvas"
      style={{
        // Ocupa el <main> del shell (que es position:relative), no la ventana:
        // con el sidebar al lado 100vw desbordaría.
        position: "absolute", inset: 0,
        background: DC.bg,
        overflow: "hidden",
        overscrollBehavior: "none",
        touchAction: "none",
        fontFamily: DC.font,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div
        ref={worldRef}
        style={{
          position: "absolute", top: 0, left: 0,
          transformOrigin: "0 0",
          willChange: "transform",
          width: "max-content", minWidth: "100%",
          minHeight: "100%",
          padding: "60px 0 80px",
        }}
      >
        <div style={{ position: "absolute", inset: -6000, backgroundImage: gridSvg, backgroundSize: "120px 120px", pointerEvents: "none", zIndex: -1 }} />
        {children}
      </div>
    </div>
  );
}
