// pieces-v2.jsx — variante "Expediente · Peligro declarado"
// Mismas frases que pieces.jsx; markup nuevo con los fixes de feedback.
// Expone PIEZAS_V2 y PiezaV2 en window (no choca con la serie original).

const PIEZAS_V2 = [
  {
    n: 1,
    img: "img/half_1.png?v=3",
    topic: "Sobre su concepto de «enemigo»",
    title: "A esa plaga hay que erradicarla",
    titleSize: 60,
    quote: "Y sepan ustedes, señores de la izquierda, en mí tendrán a un enemigo acérrimo que hará todo lo posible para destriparlos y enfrentarles, determinada y decididamente. A esa plaga hay que erradicarla.",
    quoteSize: 29,
    ctaTail: "destripen a las personas por lo que piensan.",
  },
  {
    n: 2,
    img: "img/half_2.png?v=3",
    topic: "Sobre el derecho a la manifestación",
    title: "El que proteste voy a darle de baja",
    titleSize: 58,
    quote: "…el que salga a hacer desmanes, y atacarme a la gente y a la fuerza pública, voy a darle de baja como corresponde.",
    quoteSize: 33,
    ctaTail: "golpeen o desvivan a gente inocente. La protesta es un derecho.",
  },
  {
    n: 3,
    img: "img/half_3.png?v=3",
    topic: "Sobre el restablecimiento del paramilitarismo",
    title: "Armar a la ciudadanía",
    titleSize: 72,
    quote: "Una ciudadanía decente armada es complemento de la seguridad con la fuerza pública.",
    quoteSize: 36,
    ctaTail: "se reviva la estrategia del paramilitarismo.",
  },
  {
    n: 4,
    img: "img/half_4.png?v=3",
    topic: "Sobre los «falsos positivos»",
    title: "Vivos o muertos",
    titleSize: 82,
    quote: "…tiene 20 días para que me los entregue vivos o muertos porque si van a poner resistencia suéltenle un bombazo y se acabó.",
    quoteSize: 33,
    ctaTail: "regresen los incentivos que generaron 7.837 falsos positivos.",
  },
  {
    n: 5,
    img: "img/half_5.png?v=3",
    topic: "Sobre hacer trizas la paz",
    title: "Eliminar la JEP",
    titleSize: 82,
    quote: "La JEP es un directorio político que quiere parecer un tribunal, es una farsa… hay que eliminarlo.",
    quoteSize: 34,
    ctaTail: "hagan trizas la paz.",
  },
  {
    n: 6,
    img: "img/half_6.png?v=3",
    topic: "Sobre los observadores internacionales",
    title: "Cerrar la ONU",
    titleSize: 82,
    quote: "La ONU y la OEA son directorios políticos de la izquierda que no han servido para nada… eso hay que cerrarlo.",
    quoteSize: 33,
    ctaTail: "quedemos aislados del escenario internacional.",
  },
];

// Cierre fijo: idéntico en las 6 piezas (firma de serie + lo que está en juego)
const CIERRE_V2 = "No permitas que se atente contra la democracia.";

function PiezaV2({ p }) {
  const num = String(p.n).padStart(2, "0");
  // limpia los puntos suspensivos de extremos solo para la cita textual
  const quoteText = p.quote.replace(/^…/, "").replace(/…$/, "");
  return (
    <div className="peligro">
      {/* masthead rojo: el sello de peligro arriba del todo */}
      <div className="masthead">
        <span className="lockup">
          <span className="warn">!</span>
          <span className="titles">
            <span className="pd-kicker">Expediente</span>
            <span className="pd-main">Peligro declarado</span>
          </span>
        </span>
        <span className="num">N.º {num} / 06</span>
      </div>

      {/* foto como evidencia: domada bajo el sello */}
      <div className="evidence">
        <img className="shot" src={p.img} alt="" draggable="false" />
        <div className="caption">
          <span className="who">Abelardo de la Espriella</span>
          <span className="role">· Candidato presidencial · 2026</span>
        </div>
      </div>

      <div className="body">
        <div className="eyebrow">
          Lo que dijo<span className="topic">· {p.topic}</span>
        </div>

        <div className="stack">
          <h2 className="title" style={{ fontSize: p.titleSize + "px" }}>
            {p.title}
            <span className="per">.</span>
          </h2>

          <blockquote className="quote" style={{ fontSize: p.quoteSize + "px" }}>
            <span className="gm">«</span>
            {quoteText}
            <span className="gm">»</span>
            <cite>— Abelardo de la Espriella, textual</cite>
          </blockquote>
        </div>
      </div>

      {/* rechazo: consecuencia específica + cierre fijo en rojo */}
      <div className="rechazo">
        <p className="lead">
          <b>No permitas</b> que, <u>con tu voto o por no ir a votar</u>, {p.ctaTail}
        </p>
        <p className="cierre">{CIERRE_V2}</p>
      </div>

      <div className="foot">
        <span className="slogan">Sus palabras<i>·</i>Su programa<i>·</i>Nuestro riesgo</span>
        <span className="exp">Elecciones 2026 · Exp. {num}/06</span>
      </div>
    </div>
  );
}

Object.assign(window, { PIEZAS_V2, PiezaV2, CIERRE_V2 });
