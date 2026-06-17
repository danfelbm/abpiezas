// pieces.jsx — "Peligro declarado" series, inverted hierarchy.
// The REJECTION (our voice, red, large) is the hero. His quote is demoted to
// evidence. Photo is removed or shrunk to a dossier "ficha".
// Exports: PIEZAS, PiezaRoja, PiezaFicha.

const CLOSER = "No permitas que se atente contra la democracia.";

const PIEZAS = [
  {
    n: 1,
    img: "img/half_1.png?v=3",
    topic: "Sobre quien piensa distinto",
    verdict: "Quiere exterminar a quien piensa distinto",
    verdictSize: 76,
    quote: "En mí tendrán a un enemigo acérrimo que hará todo lo posible para destriparlos. A esa plaga hay que erradicarla.",
    quoteSize: 37,
  },
  {
    n: 2,
    img: "img/half_2.png?v=3",
    topic: "Sobre la protesta social",
    verdict: "Amenaza con disparar a quien proteste",
    verdictSize: 78,
    quote: "El que salga a hacer desmanes y atacar a la fuerza pública, voy a darle de baja como corresponde.",
    quoteSize: 39,
  },
  {
    n: 3,
    img: "img/half_3.png?v=3",
    topic: "Sobre el paramilitarismo",
    verdict: "Propone volver a armar civiles",
    verdictSize: 82,
    quote: "Una ciudadanía decente armada es complemento de la seguridad con la fuerza pública.",
    quoteSize: 41,
  },
  {
    n: 4,
    img: "img/half_4.png?v=3",
    topic: "Sobre los falsos positivos",
    verdict: "Ordena matar, vivos o muertos",
    verdictSize: 82,
    quote: "Tiene 20 días para que me los entregue vivos o muertos; si van a poner resistencia, suéltenle un bombazo y se acabó.",
    quoteSize: 37,
  },
  {
    n: 5,
    img: "img/half_5.png?v=3",
    topic: "Sobre la justicia de paz",
    verdict: "Quiere acabar con la justicia de paz",
    verdictSize: 76,
    quote: "La JEP es un directorio político que quiere parecer un tribunal, es una farsa… hay que eliminarlo.",
    quoteSize: 39,
  },
  {
    n: 6,
    img: "img/half_6.png?v=3",
    topic: "Sobre los veedores internacionales",
    verdict: "Quiere expulsar a los veedores internacionales",
    verdictSize: 64,
    quote: "La ONU y la OEA son directorios políticos de la izquierda que no han servido para nada… eso hay que cerrarlo.",
    quoteSize: 38,
  },
];

function MetaRow({ p, dark }) {
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

function Evidence({ p, onLight }) {
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

function Closer() {
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
function PiezaRoja({ p }) {
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
function PiezaFicha({ p }) {
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

Object.assign(window, { PIEZAS, PiezaRoja, PiezaFicha, MetaRow, Evidence, Closer });
