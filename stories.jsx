// stories.jsx — 9:16 (1080×1920) Instagram Stories versions.
// Reuses PIEZAS data + MetaRow / Evidence / Closer from pieces.jsx.
// Exports: StoryRoja, StoryFicha.

/* DIRECTION A — translucent photo blended into the red field */
function StoryRoja({ p }) {
  return (
    <div className="story story--roja">
      <div className="st-redField">
        <img className="st-redImg" src={p.img} alt="" draggable="false" />
        <div className="st-redScrim" aria-hidden="true" />
        <div className="st-top">
          <MetaRow p={p} dark />
        </div>
        <div className="st-vWrap">
          <span className="eyebrow">Lo que propone De la Espriella</span>
          <h2 className="verdict" style={{ fontSize: Math.round(p.verdictSize * 1.18) + "px" }}>
            {p.verdict}<span className="vper">.</span>
          </h2>
        </div>
      </div>
      <Evidence p={p} onLight />
      <Closer />
    </div>
  );
}

/* DIRECTION B — photo demoted to a dossier "ficha" */
function StoryFicha({ p }) {
  return (
    <div className="story story--ficha">
      <div className="st-fichaBody">
        <MetaRow p={p} />
        <div className="st-vWrap vWrap--ficha">
          <span className="eyebrow eyebrow--ink">Lo que propone De la Espriella</span>
          <h2 className="verdict verdict--ink" style={{ fontSize: Math.round(p.verdictSize * 1.18) + "px" }}>
            {p.verdict}<span className="vper">.</span>
          </h2>
        </div>
        <figure className="st-ficha">
          <img src={p.img} alt="" draggable="false" />
          <figcaption>Abelardo de la Espriella<span>Precandidato presidencial</span></figcaption>
        </figure>
        <Evidence p={p} onLight />
      </div>
      <Closer />
    </div>
  );
}

Object.assign(window, { StoryRoja, StoryFicha });
