// Piezas.jsx — "Peligro declarado" series, inverted hierarchy.
// The REJECTION (our voice, red, large) is the hero. His quote is demoted to
// evidence. Photo is removed or shrunk to a dossier "ficha".

export function MetaRow({ p, dark }) {
  const num = String(p.n).padStart(2, "0");
  return (
    <div className={"meta" + (dark ? " meta--dark" : "")}>
      <span className="brand">
        <i className="dot" />
        Peligro declarado
      </span>
      <span className="exp">{num} — 06</span>
    </div>
  );
}

export function Evidence({ p, onLight }) {
  return (
    <div className={"evidence" + (onLight ? " evidence--light" : "")}>
      <span className="evTag">Lo dijo, textual</span>
      <blockquote className="quote" style={{ fontSize: p.quoteSize + "px" }}>
        «{p.quote}»
        <cite>— Abelardo de la Espriella<span className="evTopic">· {p.topic}</span></cite>
      </blockquote>
    </div>
  );
}

export function Closer() {
  return (
    <div className="closer">
      <span className="closerBar" />
      <p>
        No permitas que se atente contra la <u>democracia</u>.
      </p>
    </div>
  );
}

/* DIRECTION A — translucent photo blended into the red field */
export function PiezaRoja({ p }) {
  return (
    <div className="pieza pieza--roja">
      <div className="redField">
        <img className="redImg" src={p.img} alt="" draggable="false" />
        <div className="redScrim" aria-hidden="true" />
        <MetaRow p={p} dark />
        <div className="vWrap">
          <span className="eyebrow">Lo que propone De la Espriella</span>
          <h2 className="verdict" style={{ fontSize: p.verdictSize + "px" }}>
            {p.verdict}<span className="vper">.</span>
          </h2>
        </div>
      </div>
      <Evidence p={p} onLight />
      <Closer />
    </div>
  );
}

/* DIRECTION B — photo demoted to a small dossier "ficha" */
export function PiezaFicha({ p }) {
  return (
    <div className="pieza pieza--ficha">
      <div className="fichaBody">
        <MetaRow p={p} />
        <div className="vWrap vWrap--ficha">
          <span className="eyebrow eyebrow--ink">Lo que propone De la Espriella</span>
          <h2 className="verdict verdict--ink" style={{ fontSize: p.verdictSize + "px" }}>
            {p.verdict}<span className="vper">.</span>
          </h2>
        </div>
        <div className="fichaRow">
          <figure className="ficha">
            <img src={p.img} alt="" draggable="false" />
            <figcaption>Abelardo de la Espriella<span>Precandidato presidencial</span></figcaption>
          </figure>
          <Evidence p={p} onLight />
        </div>
      </div>
      <Closer />
    </div>
  );
}
