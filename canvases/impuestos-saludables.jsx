'use client';

// Canvas "Impuestos saludables" — campaña Cajar, 10 piezas en 2 formatos
// (post 1080×1080 + story 1080×1920 = 20 artboards). Transcripción fiel del
// export fuente (Piezas Impuestos Saludables.dc.html): cada <article> del
// original se convierte en un wrapper .imps (100%×100%, position:relative) que
// crea el contexto para los hijos position:absolute del diseño. La paleta y el
// grano viven en styles/impuestos.css, scopeados a .imps para no colisionar con
// pieza.css. Los estilos inline se conservan tal cual (blend modes, máscaras,
// gradientes, duotonos, subrayados de gradiente). Fidelidad > DRY: solo se
// extraen helpers byte-idénticos módulo props.

import { DesignCanvas, DCSection, DCArtboard } from "../components/canvas/DesignCanvas";

// ---- helpers compartidos (idénticos al fuente módulo props) ----

const abs = { position: "absolute", inset: 0 };

// Marco de la pieza: reemplaza al <article> fuente dentro del .dc-card.
const frame = (bg, color = "#fff") => ({
  position: "relative",
  width: "100%",
  height: "100%",
  background: bg,
  color,
  overflow: "hidden",
});

// Subrayado de gradiente bajo el texto (background-image + size + position).
const underline = (color, size = ".16em", pos = ".92em") => ({
  fontWeight: 500,
  backgroundImage: `linear-gradient(${color},${color})`,
  backgroundSize: `100% ${size}`,
  backgroundPosition: `0 ${pos}`,
  backgroundRepeat: "no-repeat",
});

function Photo({ src, pos, filter }) {
  return (
    <img src={src} alt="" style={{ ...abs, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, filter }} />
  );
}

function Grain({ blend, opacity, z }) {
  return (
    <div style={{ ...abs, background: "var(--grain)", backgroundSize: "220px 220px", mixBlendMode: blend, opacity, pointerEvents: "none", ...(z ? { zIndex: z } : {}) }} />
  );
}

// Estrella de 4 puntas (sparkle).
function Sparkle({ s, fill, style }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} style={style}>
      <path d="M12 0c1.1 8.2 3.8 10.9 12 12-8.2 1.1-10.9 3.8-12 12-1.1-8.2-3.8-10.9-12-12C8.2 10.9 10.9 8.2 12 0Z" />
    </svg>
  );
}

// Círculo con flecha (chrome / hashtag).
function ArrowCircle({ s, stroke, sw = 1.8, style }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} style={style}>
      <circle cx="12" cy="12" r="11" />
      <path d="M8 12h8M12.5 8.5 16 12l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Footer: logo Cajar + #ImpuestosSaludables. reverse invierte el orden (p4/p9 post).
function Footer({ logo, color, logoH, arrowS, hashSize, reverse, style }) {
  const img = <img src={`/logo/lockup-${logo}.png`} alt="Cajar" style={{ height: logoH, width: "auto", display: "block" }} />;
  const tag = (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <ArrowCircle s={arrowS} stroke={color} />
      <div style={{ fontSize: hashSize, fontWeight: 700, color }}>#ImpuestosSaludables</div>
    </div>
  );
  return (
    <div style={style}>
      {reverse ? <>{tag}{img}</> : <>{img}{tag}</>}
    </div>
  );
}

// Estilos de posición reutilizados en footers.
const footerBleedPost = { position: "absolute", left: 72, right: 72, bottom: 64, display: "flex", alignItems: "flex-end", justifyContent: "space-between" };
const footerBleedStory = { position: "absolute", left: 84, right: 84, bottom: 170, display: "flex", alignItems: "flex-end", justifyContent: "space-between" };

export default function ImpuestosSaludables() {
  return (
    <DesignCanvas slug="impuestos-saludables">

      {/* ============ PIEZA 1 · Niñez ============ */}
      <DCSection id="p1" title="01 · Niñez">
        <DCArtboard id="p1-post" label="01 · Niñez · Post" width={1080} height={1080}>
          <div className="imps" style={frame("var(--teal-d)")}>
            <Photo src="/impuestos/foto1.png" pos="50% 30%" filter="grayscale(1) contrast(1.06) brightness(1.02)" />
            <div style={{ ...abs, background: "var(--teal)", mixBlendMode: "multiply" }} />
            <div style={{ ...abs, background: "linear-gradient(200deg,#7FC6B4 0%,transparent 42%)", mixBlendMode: "screen", opacity: .5 }} />
            <div style={{ ...abs, background: "linear-gradient(180deg,rgba(20,45,40,.10) 0%,rgba(20,45,40,0) 34%,rgba(15,38,34,.62) 72%,rgba(12,32,28,.9) 100%)" }} />
            <Grain blend="overlay" opacity={.13} />
            <div style={{ position: "absolute", top: 64, left: 72, right: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 34, fontWeight: 500, letterSpacing: ".01em" }}>Proteger la niñez</span>
              </div>
              <Sparkle s={48} fill="#fff" style={{ opacity: .95 }} />
            </div>
            <div style={{ position: "absolute", left: 72, right: 72, bottom: 206 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 70, lineHeight: 1.1, letterSpacing: "-0.01em", textWrap: "balance" }}>Los <b style={{ fontWeight: 900 }}>impuestos saludables</b> protegen los <span style={underline("var(--teal-l)")}>derechos a la salud y alimentación</span> de niños, niñas y adolescentes.</h1>
            </div>
            <Footer logo="white" color="#fff" logoH={82} arrowS={48} hashSize={31} style={footerBleedPost} />
          </div>
        </DCArtboard>
        <DCArtboard id="p1-story" label="01 · Niñez · Story" width={1080} height={1920}>
          <div className="imps" style={frame("var(--teal-d)")}>
            <Photo src="/impuestos/foto1.png" pos="42% 30%" filter="grayscale(1) contrast(1.06) brightness(1.02)" />
            <div style={{ ...abs, background: "var(--teal)", mixBlendMode: "multiply" }} />
            <div style={{ ...abs, background: "linear-gradient(200deg,#7FC6B4 0%,transparent 42%)", mixBlendMode: "screen", opacity: .5 }} />
            <div style={{ ...abs, background: "linear-gradient(180deg,rgba(20,45,40,.10) 0%,rgba(20,45,40,0) 38%,rgba(15,38,34,.62) 70%,rgba(12,32,28,.92) 100%)" }} />
            <Grain blend="overlay" opacity={.13} />
            <div style={{ position: "absolute", top: 150, left: 84, right: 84, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 40, fontWeight: 500 }}>Proteger la niñez</span>
              </div>
              <Sparkle s={54} fill="#fff" style={{ opacity: .95 }} />
            </div>
            <div style={{ position: "absolute", left: 84, right: 84, bottom: 440 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 78, lineHeight: 1.12, letterSpacing: "-0.01em", textWrap: "balance" }}>Los <b style={{ fontWeight: 900 }}>impuestos saludables</b> protegen los <span style={underline("var(--teal-l)")}>derechos a la salud y alimentación</span> de niños, niñas y adolescentes.</h1>
            </div>
            <Footer logo="white" color="#fff" logoH={92} arrowS={52} hashSize={34} style={footerBleedStory} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============ PIEZA 2 · Salud pública ============ */}
      <DCSection id="p2" title="02 · Salud pública">
        <DCArtboard id="p2-post" label="02 · Salud pública · Post" width={1080} height={1080}>
          <div className="imps" style={frame("var(--paper)", "var(--ink)")}>
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "52%", WebkitMaskImage: "linear-gradient(90deg,transparent 0%,#000 26%)", maskImage: "linear-gradient(90deg,transparent 0%,#000 26%)" }}>
              <Photo src="/impuestos/foto2.png" pos="50% 35%" filter="grayscale(1) contrast(1) brightness(1.06)" />
              <div style={{ ...abs, background: "var(--teal)", mixBlendMode: "multiply" }} />
              <div style={{ ...abs, background: "var(--paper)", mixBlendMode: "screen", opacity: .14 }} />
            </div>
            <Grain blend="multiply" opacity={.05} />
            <div style={{ position: "absolute", top: 64, left: 72, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 48, height: 4, background: "var(--teal)", display: "block" }} />
              <span style={{ fontSize: 34, fontWeight: 500, color: "var(--teal)" }}>Salud pública</span>
            </div>
            <ArrowCircle s={48} stroke="var(--teal)" sw={1.6} style={{ position: "absolute", top: 56, left: 470 }} />
            <div style={{ position: "absolute", left: 72, top: 216, width: 560 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 48, lineHeight: 1.17, letterSpacing: "-0.01em", color: "var(--ink)" }}>Los <b style={{ fontWeight: 900 }}>impuestos saludables</b> son una medida de <span style={underline("var(--teal-l)")}>salud pública costo-efectiva</span> para prevenir enfermedades no transmisibles como <i style={{ fontWeight: 500, fontStyle: "italic" }}>diabetes y algunos tipos de cáncer.</i></h1>
              <Sparkle s={46} fill="var(--teal)" style={{ marginTop: 36, display: "block" }} />
            </div>
            <Footer logo="teal" color="var(--teal)" logoH={76} arrowS={48} hashSize={31} style={{ position: "absolute", left: 72, bottom: 64, display: "flex", alignItems: "center", gap: 24 }} />
          </div>
        </DCArtboard>
        <DCArtboard id="p2-story" label="02 · Salud pública · Story" width={1080} height={1920}>
          <div className="imps" style={frame("var(--paper)", "var(--ink)")}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "46%", WebkitMaskImage: "linear-gradient(180deg,#000 68%,transparent 100%)", maskImage: "linear-gradient(180deg,#000 68%,transparent 100%)" }}>
              <Photo src="/impuestos/foto2.png" pos="50% 30%" filter="grayscale(1) contrast(1) brightness(1.06)" />
              <div style={{ ...abs, background: "var(--teal)", mixBlendMode: "multiply" }} />
              <div style={{ ...abs, background: "var(--paper)", mixBlendMode: "screen", opacity: .14 }} />
            </div>
            <Grain blend="multiply" opacity={.05} />
            <div style={{ position: "absolute", top: 150, left: 84, right: 84, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block" }} />
                <span style={{ fontSize: 40, fontWeight: 500, color: "#fff" }}>Salud pública</span>
              </div>
              <ArrowCircle s={54} stroke="#fff" sw={1.6} />
            </div>
            <div style={{ position: "absolute", left: 84, right: 84, top: 1010 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 58, lineHeight: 1.18, letterSpacing: "-0.01em", color: "var(--ink)" }}>Los <b style={{ fontWeight: 900 }}>impuestos saludables</b> son una medida de <span style={underline("var(--teal-l)")}>salud pública costo-efectiva</span> para prevenir enfermedades no transmisibles como <i style={{ fontWeight: 500, fontStyle: "italic" }}>diabetes y algunos tipos de cáncer.</i></h1>
              <Sparkle s={52} fill="var(--teal)" style={{ marginTop: 44, display: "block" }} />
            </div>
            <Footer logo="teal" color="var(--teal)" logoH={88} arrowS={52} hashSize={34} style={footerBleedStory} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============ PIEZA 3 · Recaudo ============ */}
      <DCSection id="p3" title="03 · Recaudo">
        <DCArtboard id="p3-post" label="03 · Recaudo · Post" width={1080} height={1080}>
          <div className="imps" style={frame("var(--blue)")}>
            <Grain blend="overlay" opacity={.14} z={5} />
            <div style={{ position: "absolute", top: 64, left: 72, right: 72, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 34, fontWeight: 500 }}>Recaudo · a mayo de 2025</span>
              </div>
              <Sparkle s={48} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 72, top: 188, zIndex: 6 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, lineHeight: .82 }}>
                <span style={{ fontSize: 120, fontWeight: 500, marginTop: 26 }}>$</span>
                <span style={{ fontSize: 340, fontWeight: 900, letterSpacing: "-0.03em" }}>1,6</span>
              </div>
              <div style={{ fontSize: 76, fontWeight: 900, letterSpacing: "-0.01em", marginTop: -6 }}><span style={{ background: "#fff", color: "var(--blue)", padding: "0 .1em", borderRadius: ".05em" }}>billones</span> <span style={{ fontWeight: 300 }}>de pesos</span></div>
            </div>
            <div style={{ position: "absolute", left: 72, right: 340, top: 770, zIndex: 6 }}>
              <p style={{ margin: 0, fontSize: 38, fontWeight: 300, lineHeight: 1.28 }}>Pueden dirigirse al <span style={{ fontWeight: 700, background: "#fff", color: "var(--blue)", padding: "0 .12em", borderRadius: ".08em", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>sistema de salud</span> y a políticas sociales urgentes.</p>
            </div>
            <div style={{ position: "absolute", right: 64, top: 706, width: 250, height: 250, borderRadius: "50%", overflow: "hidden", zIndex: 6, boxShadow: "0 0 0 6px rgba(255,255,255,.14)" }}>
              <Photo src="/impuestos/foto3.png" pos="50% 40%" filter="grayscale(1) contrast(1.05) brightness(1.02)" />
              <div style={{ ...abs, background: "var(--blue)", mixBlendMode: "multiply", opacity: .55 }} />
            </div>
            <Footer logo="white" color="#fff" logoH={82} arrowS={48} hashSize={31} style={{ ...footerBleedPost, zIndex: 6 }} />
          </div>
        </DCArtboard>
        <DCArtboard id="p3-story" label="03 · Recaudo · Story" width={1080} height={1920}>
          <div className="imps" style={frame("var(--blue)")}>
            <Grain blend="overlay" opacity={.14} z={5} />
            <div style={{ position: "absolute", top: 150, left: 84, right: 84, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 40, fontWeight: 500 }}>Recaudo · a mayo de 2025</span>
              </div>
              <Sparkle s={54} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 84, top: 460, zIndex: 6 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, lineHeight: .82 }}>
                <span style={{ fontSize: 150, fontWeight: 500, marginTop: 34 }}>$</span>
                <span style={{ fontSize: 400, fontWeight: 900, letterSpacing: "-0.03em" }}>1,6</span>
              </div>
              <div style={{ fontSize: 92, fontWeight: 900, letterSpacing: "-0.01em", marginTop: 6 }}><span style={{ background: "#fff", color: "var(--blue)", padding: "0 .1em", borderRadius: ".05em" }}>billones</span> <span style={{ fontWeight: 300 }}>de pesos</span></div>
            </div>
            <div style={{ position: "absolute", left: 84, width: 560, top: 1240, zIndex: 6 }}>
              <p style={{ margin: 0, fontSize: 42, fontWeight: 300, lineHeight: 1.3 }}>Pueden dirigirse al <span style={{ fontWeight: 700, background: "#fff", color: "var(--blue)", padding: "0 .12em", borderRadius: ".08em", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>sistema de salud</span> y a políticas sociales urgentes.</p>
            </div>
            <div style={{ position: "absolute", right: 84, top: 1250, width: 300, height: 300, borderRadius: "50%", overflow: "hidden", zIndex: 6, boxShadow: "0 0 0 7px rgba(255,255,255,.14)" }}>
              <Photo src="/impuestos/foto3.png" pos="50% 40%" filter="grayscale(1) contrast(1.05) brightness(1.02)" />
              <div style={{ ...abs, background: "var(--blue)", mixBlendMode: "multiply", opacity: .55 }} />
            </div>
            <Footer logo="white" color="#fff" logoH={92} arrowS={52} hashSize={34} style={{ ...footerBleedStory, zIndex: 6 }} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============ PIEZA 4 · Industria ============ */}
      <DCSection id="p4" title="04 · Industria">
        <DCArtboard id="p4-post" label="04 · Industria · Post" width={1080} height={1080}>
          <div className="imps" style={frame("var(--paper)", "var(--ink)")}>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "50%", WebkitMaskImage: "linear-gradient(270deg,transparent 0%,#000 26%)", maskImage: "linear-gradient(270deg,transparent 0%,#000 26%)" }}>
              <Photo src="/impuestos/foto4.png" pos="50% 50%" filter="grayscale(1) contrast(1) brightness(1.05)" />
              <div style={{ ...abs, background: "var(--blue)", mixBlendMode: "multiply" }} />
              <div style={{ ...abs, background: "var(--paper)", mixBlendMode: "screen", opacity: .12 }} />
            </div>
            <Grain blend="multiply" opacity={.05} />
            <div style={{ position: "absolute", top: 64, right: 72, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 34, fontWeight: 500, color: "var(--blue)" }}>Industria</span>
              <span style={{ width: 48, height: 4, background: "var(--blue)", display: "block" }} />
            </div>
            <div style={{ position: "absolute", right: 72, top: 200, width: 470, textAlign: "right" }}>
              <h1 style={{ margin: "0 0 22px", fontWeight: 900, fontSize: 52, lineHeight: 1.08, letterSpacing: "-0.01em", color: "var(--blue)" }}>Se pudo en Reino Unido, se puede en Colombia.</h1>
              <p style={{ margin: 0, fontWeight: 300, fontSize: 35, lineHeight: 1.3, color: "var(--ink)" }}>Las industrias pueden <span style={underline("#B9C0F2", ".16em", ".95em")}>reformular sus productos</span>, reduciendo el contenido de azúcar y ofreciendo alternativas más sanas para toda la población.</p>
              <Sparkle s={46} fill="var(--blue)" style={{ marginTop: 36, marginLeft: "auto", display: "block" }} />
            </div>
            <Footer logo="teal" color="var(--blue)" logoH={76} arrowS={48} hashSize={31} reverse style={{ position: "absolute", right: 72, bottom: 64, display: "flex", alignItems: "center", gap: 24 }} />
          </div>
        </DCArtboard>
        <DCArtboard id="p4-story" label="04 · Industria · Story" width={1080} height={1920}>
          <div className="imps" style={frame("var(--paper)", "var(--ink)")}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "46%", WebkitMaskImage: "linear-gradient(180deg,#000 68%,transparent 100%)", maskImage: "linear-gradient(180deg,#000 68%,transparent 100%)" }}>
              <Photo src="/impuestos/foto4.png" pos="50% 42%" filter="grayscale(1) contrast(1) brightness(1.05)" />
              <div style={{ ...abs, background: "var(--blue)", mixBlendMode: "multiply" }} />
              <div style={{ ...abs, background: "var(--paper)", mixBlendMode: "screen", opacity: .12 }} />
            </div>
            <Grain blend="multiply" opacity={.05} />
            <div style={{ position: "absolute", top: 150, left: 84, right: 84, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block" }} />
                <span style={{ fontSize: 40, fontWeight: 500, color: "#fff" }}>Industria</span>
              </div>
              <Sparkle s={54} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 84, right: 84, top: 990 }}>
              <h1 style={{ margin: "0 0 30px", fontWeight: 900, fontSize: 64, lineHeight: 1.06, letterSpacing: "-0.01em", color: "var(--blue)" }}>Se pudo en Reino Unido, se puede en Colombia.</h1>
              <p style={{ margin: 0, fontWeight: 300, fontSize: 40, lineHeight: 1.32, color: "var(--ink)" }}>Las industrias pueden <span style={underline("#B9C0F2", ".16em", ".95em")}>reformular sus productos</span>, reduciendo el contenido de azúcar y ofreciendo alternativas más sanas para toda la población.</p>
              <Sparkle s={52} fill="var(--blue)" style={{ marginTop: 44, display: "block" }} />
            </div>
            <Footer logo="teal" color="var(--blue)" logoH={88} arrowS={52} hashSize={34} style={footerBleedStory} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============ PIEZA 5 · Respaldo OMS ============ */}
      <DCSection id="p5" title="05 · Respaldo OMS">
        <DCArtboard id="p5-post" label="05 · Respaldo OMS · Post" width={1080} height={1080}>
          <div className="imps" style={frame("var(--blue-d)")}>
            <Photo src="/impuestos/foto5.png" pos="50% 45%" filter="grayscale(1) contrast(1.05) brightness(1)" />
            <div style={{ ...abs, background: "var(--blue)", mixBlendMode: "multiply" }} />
            <div style={{ ...abs, background: "linear-gradient(200deg,#8E97E8 0%,transparent 44%)", mixBlendMode: "screen", opacity: .45 }} />
            <div style={{ ...abs, background: "linear-gradient(180deg,rgba(15,22,70,.12) 0%,rgba(15,22,70,0) 30%,rgba(13,19,60,.66) 70%,rgba(11,16,52,.92) 100%)" }} />
            <Grain blend="overlay" opacity={.14} />
            <div style={{ position: "absolute", top: 64, left: 72, right: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 34, fontWeight: 500 }}>Respaldo · OMS</span>
              </div>
              <Sparkle s={48} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 72, right: 120, bottom: 200 }}>
              <p style={{ margin: "0 0 14px", fontWeight: 300, fontSize: 44, lineHeight: 1.16 }}>Los <b style={{ fontWeight: 900 }}>impuestos saludables</b> están respaldados por la <span style={{ fontWeight: 700, background: "#fff", color: "var(--blue-d)", padding: "0 .12em", borderRadius: ".06em" }}>OMS</span>.</p>
              <div style={{ fontWeight: 300, fontSize: 40, lineHeight: 1, marginBottom: 4 }}>Los impuestos saludables</div>
              <div style={{ fontWeight: 900, fontSize: 94, lineHeight: .98, letterSpacing: "-0.02em" }}><i style={{ fontStyle: "italic", borderBottom: "6px solid #fff", paddingBottom: 8 }}>salvan vidas.</i></div>
            </div>
            <Footer logo="white" color="#fff" logoH={82} arrowS={48} hashSize={31} style={footerBleedPost} />
          </div>
        </DCArtboard>
        <DCArtboard id="p5-story" label="05 · Respaldo OMS · Story" width={1080} height={1920}>
          <div className="imps" style={frame("var(--blue-d)")}>
            <Photo src="/impuestos/foto5.png" pos="50% 45%" filter="grayscale(1) contrast(1.05) brightness(1)" />
            <div style={{ ...abs, background: "var(--blue)", mixBlendMode: "multiply" }} />
            <div style={{ ...abs, background: "linear-gradient(200deg,#8E97E8 0%,transparent 44%)", mixBlendMode: "screen", opacity: .45 }} />
            <div style={{ ...abs, background: "linear-gradient(180deg,rgba(15,22,70,.12) 0%,rgba(15,22,70,0) 34%,rgba(13,19,60,.66) 68%,rgba(11,16,52,.94) 100%)" }} />
            <Grain blend="overlay" opacity={.14} />
            <div style={{ position: "absolute", top: 150, left: 84, right: 84, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 40, fontWeight: 500 }}>Respaldo · OMS</span>
              </div>
              <Sparkle s={54} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 84, right: 100, bottom: 440 }}>
              <p style={{ margin: "0 0 22px", fontWeight: 300, fontSize: 50, lineHeight: 1.2 }}>Los <b style={{ fontWeight: 900 }}>impuestos saludables</b> están respaldados por la <span style={{ fontWeight: 700, background: "#fff", color: "var(--blue-d)", padding: "0 .12em", borderRadius: ".06em" }}>OMS</span>.</p>
              <div style={{ fontWeight: 300, fontSize: 46, lineHeight: 1, marginBottom: 10 }}>Los impuestos saludables</div>
              <div style={{ fontWeight: 900, fontSize: 116, lineHeight: 1.02, letterSpacing: "-0.02em" }}><i style={{ fontStyle: "italic", borderBottom: "7px solid #fff", paddingBottom: 8 }}>salvan vidas.</i></div>
            </div>
            <Footer logo="white" color="#fff" logoH={92} arrowS={52} hashSize={34} style={footerBleedStory} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============ PIEZA 6 · Derechos humanos ============ */}
      <DCSection id="p6" title="06 · Derechos humanos">
        <DCArtboard id="p6-post" label="06 · Derechos humanos · Post" width={1080} height={1080}>
          <div className="imps" style={frame("var(--teal-d)")}>
            <Photo src="/impuestos/foto6.png" pos="50% 42%" filter="grayscale(1) contrast(1.06) brightness(1.02)" />
            <div style={{ ...abs, background: "var(--teal)", mixBlendMode: "multiply" }} />
            <div style={{ ...abs, background: "linear-gradient(160deg,#7FC6B4 0%,transparent 40%)", mixBlendMode: "screen", opacity: .5 }} />
            <div style={{ ...abs, background: "linear-gradient(180deg,rgba(20,45,40,.10) 0%,rgba(20,45,40,0) 34%,rgba(15,38,34,.62) 72%,rgba(12,32,28,.9) 100%)" }} />
            <Grain blend="overlay" opacity={.13} />
            <div style={{ position: "absolute", top: 64, left: 72, right: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 34, fontWeight: 500 }}>Una discusión en clave de derechos</span>
              </div>
              <ArrowCircle s={48} stroke="#fff" sw={1.6} />
            </div>
            <div style={{ position: "absolute", left: 72, right: 96, bottom: 206 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 70, lineHeight: 1.1, letterSpacing: "-0.01em", textWrap: "balance" }}>Los <b style={{ fontWeight: 900 }}>impuestos saludables</b> protegen los <span style={underline("var(--teal-l)")}>derechos a la alimentación y la salud.</span></h1>
            </div>
            <Footer logo="white" color="#fff" logoH={82} arrowS={48} hashSize={31} style={footerBleedPost} />
          </div>
        </DCArtboard>
        <DCArtboard id="p6-story" label="06 · Derechos humanos · Story" width={1080} height={1920}>
          <div className="imps" style={frame("var(--teal-d)")}>
            <Photo src="/impuestos/foto6.png" pos="50% 42%" filter="grayscale(1) contrast(1.06) brightness(1.02)" />
            <div style={{ ...abs, background: "var(--teal)", mixBlendMode: "multiply" }} />
            <div style={{ ...abs, background: "linear-gradient(160deg,#7FC6B4 0%,transparent 40%)", mixBlendMode: "screen", opacity: .5 }} />
            <div style={{ ...abs, background: "linear-gradient(180deg,rgba(20,45,40,.10) 0%,rgba(20,45,40,0) 36%,rgba(15,38,34,.62) 70%,rgba(12,32,28,.92) 100%)" }} />
            <Grain blend="overlay" opacity={.13} />
            <div style={{ position: "absolute", top: 150, left: 84, right: 84, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 40, fontWeight: 500 }}>Una discusión en clave de derechos</span>
              </div>
              <ArrowCircle s={54} stroke="#fff" sw={1.6} />
            </div>
            <div style={{ position: "absolute", left: 84, right: 110, bottom: 440 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 82, lineHeight: 1.12, letterSpacing: "-0.01em", textWrap: "balance" }}>Los <b style={{ fontWeight: 900 }}>impuestos saludables</b> protegen los <span style={underline("var(--teal-l)")}>derechos a la alimentación y la salud.</span></h1>
            </div>
            <Footer logo="white" color="#fff" logoH={92} arrowS={52} hashSize={34} style={footerBleedStory} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============ PIEZA 7 · Alimentación real ============ */}
      <DCSection id="p7" title="07 · Alimentación real">
        <DCArtboard id="p7-post" label="07 · Alimentación real · Post" width={1080} height={1080}>
          <div className="imps" style={frame("var(--paper)", "var(--ink)")}>
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "52%", WebkitMaskImage: "linear-gradient(90deg,transparent 0%,#000 26%)", maskImage: "linear-gradient(90deg,transparent 0%,#000 26%)" }}>
              <Photo src="/impuestos/foto7.png" pos="50% 50%" filter="grayscale(1) contrast(1) brightness(1.05)" />
              <div style={{ ...abs, background: "var(--teal)", mixBlendMode: "multiply" }} />
              <div style={{ ...abs, background: "var(--paper)", mixBlendMode: "screen", opacity: .14 }} />
            </div>
            <Grain blend="multiply" opacity={.05} />
            <div style={{ position: "absolute", top: 64, left: 72, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 48, height: 4, background: "var(--teal)", display: "block" }} />
              <span style={{ fontSize: 34, fontWeight: 500, color: "var(--teal)" }}>Alimentación real</span>
            </div>
            <div style={{ position: "absolute", left: 72, top: 236, width: 540 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 64, lineHeight: 1.12, letterSpacing: "-0.01em", color: "var(--ink)" }}>Colombia es un <b style={{ fontWeight: 900, color: "var(--teal)" }}>país agrícola</b>: es posible promover <span style={underline("var(--teal-l)")}>hábitos alimenticios saludables.</span></h1>
              <Sparkle s={46} fill="var(--teal)" style={{ marginTop: 36, display: "block" }} />
            </div>
            <Footer logo="teal" color="var(--teal)" logoH={76} arrowS={48} hashSize={31} style={{ position: "absolute", left: 72, bottom: 64, display: "flex", alignItems: "center", gap: 24 }} />
          </div>
        </DCArtboard>
        <DCArtboard id="p7-story" label="07 · Alimentación real · Story" width={1080} height={1920}>
          <div className="imps" style={frame("var(--paper)", "var(--ink)")}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "46%", WebkitMaskImage: "linear-gradient(180deg,#000 68%,transparent 100%)", maskImage: "linear-gradient(180deg,#000 68%,transparent 100%)" }}>
              <Photo src="/impuestos/foto7.png" pos="50% 40%" filter="grayscale(1) contrast(1) brightness(1.05)" />
              <div style={{ ...abs, background: "var(--teal)", mixBlendMode: "multiply" }} />
              <div style={{ ...abs, background: "var(--paper)", mixBlendMode: "screen", opacity: .14 }} />
            </div>
            <Grain blend="multiply" opacity={.05} />
            <div style={{ position: "absolute", top: 150, left: 84, right: 84, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block" }} />
                <span style={{ fontSize: 40, fontWeight: 500, color: "#fff" }}>Alimentación real</span>
              </div>
              <Sparkle s={54} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 84, right: 84, top: 1010 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 70, lineHeight: 1.14, letterSpacing: "-0.01em", color: "var(--ink)" }}>Colombia es un <b style={{ fontWeight: 900, color: "var(--teal)" }}>país agrícola</b>: es posible promover <span style={underline("var(--teal-l)")}>hábitos alimenticios saludables.</span></h1>
              <Sparkle s={52} fill="var(--teal)" style={{ marginTop: 44, display: "block" }} />
            </div>
            <Footer logo="teal" color="var(--teal)" logoH={88} arrowS={52} hashSize={34} style={footerBleedStory} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============ PIEZA 8 · Prevención ============ */}
      <DCSection id="p8" title="08 · Prevención">
        <DCArtboard id="p8-post" label="08 · Prevención · Post" width={1080} height={1080}>
          <div className="imps" style={frame("var(--blue-d)")}>
            <Photo src="/impuestos/foto8.png" pos="50% 40%" filter="grayscale(1) contrast(1.05) brightness(1)" />
            <div style={{ ...abs, background: "var(--blue)", mixBlendMode: "multiply" }} />
            <div style={{ ...abs, background: "linear-gradient(200deg,#8E97E8 0%,transparent 44%)", mixBlendMode: "screen", opacity: .42 }} />
            <div style={{ ...abs, background: "linear-gradient(180deg,rgba(15,22,70,.14) 0%,rgba(15,22,70,0) 30%,rgba(13,19,60,.66) 70%,rgba(11,16,52,.92) 100%)" }} />
            <Grain blend="overlay" opacity={.14} />
            <div style={{ position: "absolute", top: 64, left: 72, right: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 34, fontWeight: 500 }}>Prevención</span>
              </div>
              <Sparkle s={48} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 72, right: 96, bottom: 200 }}>
              <h1 style={{ margin: "0 0 20px", fontWeight: 900, fontSize: 82, lineHeight: 1.0, letterSpacing: "-0.02em", textWrap: "balance" }}>Prevenir es más barato que <i style={{ fontStyle: "italic", borderBottom: "5px solid #fff", paddingBottom: 6 }}>tratar.</i></h1>
              <p style={{ margin: 0, fontWeight: 300, fontSize: 38, lineHeight: 1.26 }}>Los impuestos saludables evitan enfermedades como <span style={underline("#8E97E8", ".15em", ".95em")}>diabetes y cáncer.</span></p>
            </div>
            <Footer logo="white" color="#fff" logoH={82} arrowS={48} hashSize={31} style={footerBleedPost} />
          </div>
        </DCArtboard>
        <DCArtboard id="p8-story" label="08 · Prevención · Story" width={1080} height={1920}>
          <div className="imps" style={frame("var(--blue-d)")}>
            <Photo src="/impuestos/foto8.png" pos="50% 40%" filter="grayscale(1) contrast(1.05) brightness(1)" />
            <div style={{ ...abs, background: "var(--blue)", mixBlendMode: "multiply" }} />
            <div style={{ ...abs, background: "linear-gradient(200deg,#8E97E8 0%,transparent 44%)", mixBlendMode: "screen", opacity: .42 }} />
            <div style={{ ...abs, background: "linear-gradient(180deg,rgba(15,22,70,.14) 0%,rgba(15,22,70,0) 34%,rgba(13,19,60,.66) 68%,rgba(11,16,52,.94) 100%)" }} />
            <Grain blend="overlay" opacity={.14} />
            <div style={{ position: "absolute", top: 150, left: 84, right: 84, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 40, fontWeight: 500 }}>Prevención</span>
              </div>
              <Sparkle s={54} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 84, right: 110, bottom: 440 }}>
              <h1 style={{ margin: "0 0 30px", fontWeight: 900, fontSize: 100, lineHeight: 1.02, letterSpacing: "-0.02em", textWrap: "balance" }}>Prevenir es más barato que <i style={{ fontStyle: "italic", borderBottom: "6px solid #fff", paddingBottom: 8 }}>tratar.</i></h1>
              <p style={{ margin: 0, fontWeight: 300, fontSize: 44, lineHeight: 1.28 }}>Los impuestos saludables evitan enfermedades como <span style={underline("#8E97E8", ".15em", ".95em")}>diabetes y cáncer.</span></p>
            </div>
            <Footer logo="white" color="#fff" logoH={92} arrowS={52} hashSize={34} style={footerBleedStory} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============ PIEZA 9 · Evidencia ============ */}
      <DCSection id="p9" title="09 · Evidencia">
        <DCArtboard id="p9-post" label="09 · Evidencia · Post" width={1080} height={1080}>
          <div className="imps" style={frame("var(--paper)", "var(--ink)")}>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "50%", WebkitMaskImage: "linear-gradient(270deg,transparent 0%,#000 26%)", maskImage: "linear-gradient(270deg,transparent 0%,#000 26%)" }}>
              <Photo src="/impuestos/foto9.png" pos="50% 50%" filter="grayscale(1) contrast(1.02) brightness(1.04)" />
              <div style={{ ...abs, background: "var(--blue)", mixBlendMode: "multiply" }} />
              <div style={{ ...abs, background: "var(--paper)", mixBlendMode: "screen", opacity: .12 }} />
            </div>
            <Grain blend="multiply" opacity={.05} />
            <div style={{ position: "absolute", top: 64, right: 72, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 34, fontWeight: 500, color: "var(--blue)" }}>La evidencia es clara</span>
              <span style={{ width: 48, height: 4, background: "var(--blue)", display: "block" }} />
            </div>
            <div style={{ position: "absolute", right: 72, top: 250, width: 470, textAlign: "right" }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 62, lineHeight: 1.12, letterSpacing: "-0.01em", color: "var(--ink)" }}><b style={{ fontWeight: 900 }}>Impuestos saludables</b> para <span style={underline("#B9C0F2")}>proteger la salud</span> de niños, niñas y adolescentes.</h1>
              <Sparkle s={46} fill="var(--blue)" style={{ marginTop: 36, marginLeft: "auto", display: "block" }} />
            </div>
            <Footer logo="teal" color="var(--blue)" logoH={76} arrowS={48} hashSize={31} reverse style={{ position: "absolute", right: 72, bottom: 64, display: "flex", alignItems: "center", gap: 24 }} />
          </div>
        </DCArtboard>
        <DCArtboard id="p9-story" label="09 · Evidencia · Story" width={1080} height={1920}>
          <div className="imps" style={frame("var(--paper)", "var(--ink)")}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "46%", WebkitMaskImage: "linear-gradient(180deg,#000 68%,transparent 100%)", maskImage: "linear-gradient(180deg,#000 68%,transparent 100%)" }}>
              <Photo src="/impuestos/foto9.png" pos="50% 55%" filter="grayscale(1) contrast(1.02) brightness(1.04)" />
              <div style={{ ...abs, background: "var(--blue)", mixBlendMode: "multiply" }} />
              <div style={{ ...abs, background: "var(--paper)", mixBlendMode: "screen", opacity: .12 }} />
            </div>
            <Grain blend="multiply" opacity={.05} />
            <div style={{ position: "absolute", top: 150, left: 84, right: 84, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block" }} />
                <span style={{ fontSize: 40, fontWeight: 500, color: "#fff" }}>La evidencia es clara</span>
              </div>
              <Sparkle s={54} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 84, right: 84, top: 1010 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 70, lineHeight: 1.14, letterSpacing: "-0.01em", color: "var(--ink)" }}><b style={{ fontWeight: 900 }}>Impuestos saludables</b> para <span style={underline("#B9C0F2")}>proteger la salud</span> de niños, niñas y adolescentes.</h1>
              <Sparkle s={52} fill="var(--blue)" style={{ marginTop: 44, display: "block" }} />
            </div>
            <Footer logo="teal" color="var(--blue)" logoH={88} arrowS={52} hashSize={34} style={footerBleedStory} />
          </div>
        </DCArtboard>
      </DCSection>

      {/* ============ PIEZA 10 · Equidad ============ */}
      <DCSection id="p10" title="10 · Equidad">
        <DCArtboard id="p10-post" label="10 · Equidad · Post" width={1080} height={1080}>
          <div className="imps" style={frame("var(--teal-d)")}>
            <Photo src="/impuestos/foto10.png" pos="50% 45%" filter="grayscale(1) contrast(1.06) brightness(1.02)" />
            <div style={{ ...abs, background: "var(--teal)", mixBlendMode: "multiply" }} />
            <div style={{ ...abs, background: "linear-gradient(160deg,#7FC6B4 0%,transparent 42%)", mixBlendMode: "screen", opacity: .48 }} />
            <div style={{ ...abs, background: "linear-gradient(180deg,rgba(20,45,40,.10) 0%,rgba(20,45,40,0) 30%,rgba(15,38,34,.66) 70%,rgba(12,32,28,.92) 100%)" }} />
            <Grain blend="overlay" opacity={.13} />
            <div style={{ position: "absolute", top: 64, left: 72, right: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 34, fontWeight: 500 }}>Proteger la infancia</span>
              </div>
              <Sparkle s={48} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 72, right: 96, bottom: 200 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 52, lineHeight: 1.16, letterSpacing: "-0.01em", textWrap: "balance" }}>Los <b style={{ fontWeight: 900 }}>impuestos saludables</b> contribuyen a la lucha contra la <span style={underline("#fff", ".12em", ".95em")}>epidemia</span> de las enfermedades no transmisibles que afectan a las <span style={underline("var(--teal-l)", ".15em", ".93em")}>personas más desfavorecidas.</span></h1>
            </div>
            <Footer logo="white" color="#fff" logoH={82} arrowS={48} hashSize={31} style={footerBleedPost} />
          </div>
        </DCArtboard>
        <DCArtboard id="p10-story" label="10 · Equidad · Story" width={1080} height={1920}>
          <div className="imps" style={frame("var(--teal-d)")}>
            <Photo src="/impuestos/foto10.png" pos="60% 45%" filter="grayscale(1) contrast(1.06) brightness(1.02)" />
            <div style={{ ...abs, background: "var(--teal)", mixBlendMode: "multiply" }} />
            <div style={{ ...abs, background: "linear-gradient(160deg,#7FC6B4 0%,transparent 42%)", mixBlendMode: "screen", opacity: .48 }} />
            <div style={{ ...abs, background: "linear-gradient(180deg,rgba(20,45,40,.10) 0%,rgba(20,45,40,0) 34%,rgba(15,38,34,.66) 68%,rgba(12,32,28,.94) 100%)" }} />
            <Grain blend="overlay" opacity={.13} />
            <div style={{ position: "absolute", top: 150, left: 84, right: 84, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 48, height: 4, background: "#fff", display: "block", opacity: .85 }} />
                <span style={{ fontSize: 40, fontWeight: 500 }}>Proteger la infancia</span>
              </div>
              <Sparkle s={54} fill="#fff" />
            </div>
            <div style={{ position: "absolute", left: 84, right: 110, bottom: 440 }}>
              <h1 style={{ margin: 0, fontWeight: 300, fontSize: 64, lineHeight: 1.18, letterSpacing: "-0.01em", textWrap: "balance" }}>Los <b style={{ fontWeight: 900 }}>impuestos saludables</b> contribuyen a la lucha contra la <span style={underline("#fff", ".12em", ".95em")}>epidemia</span> de las enfermedades no transmisibles que afectan a las <span style={underline("var(--teal-l)", ".15em", ".93em")}>personas más desfavorecidas.</span></h1>
            </div>
            <Footer logo="white" color="#fff" logoH={92} arrowS={52} hashSize={34} style={footerBleedStory} />
          </div>
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}
