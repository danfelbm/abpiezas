// piezas.ts — datos de la serie "Peligro declarado".
// Rutas absolutas: las páginas viven bajo /c/[slug]/ y una ruta relativa se rompería.

export interface Pieza {
  n: number;
  img: string;
  topic: string;
  verdict: string;
  verdictSize: number;
  quote: string;
  quoteSize: number;
}

export const PIEZAS: Pieza[] = [
  {
    n: 1,
    img: "/img/half_1.png",
    topic: "Sobre quien piensa distinto",
    verdict: "Quiere exterminar a quien piensa distinto",
    verdictSize: 76,
    quote: "En mí tendrán a un enemigo acérrimo que hará todo lo posible para destriparlos. A esa plaga hay que erradicarla.",
    quoteSize: 37,
  },
  {
    n: 2,
    img: "/img/half_2.png",
    topic: "Sobre la protesta social",
    verdict: "Amenaza con disparar a quien proteste",
    verdictSize: 78,
    quote: "El que salga a hacer desmanes y atacar a la fuerza pública, voy a darle de baja como corresponde.",
    quoteSize: 39,
  },
  {
    n: 3,
    img: "/img/half_3.png",
    topic: "Sobre el paramilitarismo",
    verdict: "Propone volver a armar civiles",
    verdictSize: 82,
    quote: "Una ciudadanía decente armada es complemento de la seguridad con la fuerza pública.",
    quoteSize: 41,
  },
  {
    n: 4,
    img: "/img/half_4.png",
    topic: "Sobre los falsos positivos",
    verdict: "Ordena matar, vivos o muertos",
    verdictSize: 82,
    quote: "Tiene 20 días para que me los entregue vivos o muertos; si van a poner resistencia, suéltenle un bombazo y se acabó.",
    quoteSize: 37,
  },
  {
    n: 5,
    img: "/img/half_5.png",
    topic: "Sobre la justicia de paz",
    verdict: "Quiere acabar con la justicia de paz",
    verdictSize: 76,
    quote: "La JEP es un directorio político que quiere parecer un tribunal, es una farsa… hay que eliminarlo.",
    quoteSize: 39,
  },
  {
    n: 6,
    img: "/img/half_6.png",
    topic: "Sobre los veedores internacionales",
    verdict: "Quiere expulsar a los veedores internacionales",
    verdictSize: 64,
    quote: "La ONU y la OEA son directorios políticos de la izquierda que no han servido para nada… eso hay que cerrarlo.",
    quoteSize: 38,
  },
];
