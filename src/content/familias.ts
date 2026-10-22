import { w } from "./crear";
import type { Morfema, Palabra } from "./tipos";

export type Familia = {
  slug: string;
  raiz: Morfema;
  resumen: string;
  origen: string;
  palabras: Palabra[];
  nota?: string;
};

export const familias: Familia[] = [
  {
    slug: "dian",
    raiz: { h: "电", p: "diàn", m: "electricidad" },
    resumen:
      "Aprende 电 y desbloqueas casi todo el vocabulario de tecnología: cada aparato es «eléctrico + algo».",
    origen:
      "Su forma tradicional, 電, lleva arriba 雨 (lluvia): originalmente significaba «relámpago». De relámpago pasó a electricidad.",
    palabras: [
      w("电视", "diàn shì", ["electricidad", "ver"], "televisión", { lit: "visión eléctrica" }),
      w("电话", "diàn huà", ["electricidad", "habla"], "teléfono", { lit: "habla eléctrica" }),
      w("电脑", "diàn nǎo", ["electricidad", "cerebro"], "computadora", { lit: "cerebro eléctrico" }),
      w("电影", "diàn yǐng", ["electricidad", "sombra"], "película", {
        lit: "sombra eléctrica",
        nota: "El cine es literalmente sombras proyectadas con electricidad.",
      }),
      w("电池", "diàn chí", ["electricidad", "estanque"], "pila, batería", { lit: "estanque de electricidad" }),
      w("电梯", "diàn tī", ["electricidad", "escalera"], "ascensor", { lit: "escalera eléctrica" }),
      w("电车", "diàn chē", ["electricidad", "vehículo"], "tranvía, trolebús", { lit: "vehículo eléctrico" }),
    ],
  },
  {
    slug: "che",
    raiz: { h: "车", p: "chē", m: "vehículo" },
    resumen:
      "Casi todo lo que tiene ruedas termina en 车. El carácter de adelante te dice qué tipo de vehículo es.",
    origen:
      "Su forma tradicional, 車, es un dibujo de un carro visto desde arriba: el eje con las dos ruedas.",
    palabras: [
      w("火车", "huǒ chē", ["fuego", "vehículo"], "tren", {
        lit: "vehículo de fuego",
        nota: "Los primeros trenes funcionaban con carbón: de ahí el «fuego».",
      }),
      w("汽车", "qì chē", ["vapor, gas", "vehículo"], "automóvil", { lit: "vehículo de gas" }),
      w("自行车", "zì xíng chē", ["uno mismo", "andar", "vehículo"], "bicicleta", {
        lit: "vehículo que anda por uno mismo",
      }),
      w("出租车", "chū zū chē", ["dar, salir", "alquilar", "vehículo"], "taxi", { lit: "vehículo que se da en alquiler" }),
      w("电车", "diàn chē", ["electricidad", "vehículo"], "tranvía, trolebús"),
      w("车站", "chē zhàn", ["vehículo", "parada"], "estación, paradero", {
        nota: "Aquí 车 va primero: ya no es la categoría, sino lo que precisa qué tipo de parada es.",
      }),
    ],
  },
  {
    slug: "ji",
    raiz: { h: "机", p: "jī", m: "máquina" },
    resumen: "机 marca la categoría «máquina, aparato». También aparece en palabras sobre momentos clave.",
    origen:
      "Su forma tradicional, 機, nombraba el mecanismo de disparo de una ballesta o de un telar: la pieza que «hace funcionar» algo.",
    palabras: [
      w("飞机", "fēi jī", ["volar", "máquina"], "avión", { lit: "máquina voladora" }),
      w("手机", "shǒu jī", ["mano", "máquina"], "celular", { lit: "máquina de mano" }),
      w("直升机", "zhí shēng jī", ["recto", "subir", "máquina"], "helicóptero", { lit: "máquina que sube en vertical" }),
      w("司机", "sī jī", ["encargarse de", "máquina"], "conductor, chofer", { lit: "el que se encarga de la máquina" }),
      w("机场", "jī chǎng", ["máquina", "campo"], "aeropuerto", { lit: "campo de (las) máquinas (voladoras)" }),
    ],
    nota:
      "Un carácter puede tener más de un sentido. En 机会 jīhuì (oportunidad), 机 significa «momento clave», no «máquina». Por eso conviene aprender cada carácter con varias palabras.",
  },
  {
    slug: "xin",
    raiz: { h: "心", p: "xīn", m: "corazón, mente" },
    resumen:
      "Las emociones se construyen sobre 心: lo que le pasa al corazón describe cómo te sientes.",
    origen: "Es un dibujo del corazón. En chino antiguo, el corazón era también el lugar donde se piensa.",
    palabras: [
      w("开心", "kāi xīn", ["abrir", "corazón"], "feliz, contento", { lit: "corazón abierto" }),
      w("伤心", "shāng xīn", ["herir", "corazón"], "muy triste, dolido", { lit: "herir el corazón" }),
      w("担心", "dān xīn", ["cargar al hombro", "corazón"], "preocuparse", { lit: "cargar el corazón" }),
      w("放心", "fàng xīn", ["soltar", "corazón"], "quedarse tranquilo", {
        lit: "soltar el corazón",
        nota: "Lo contrario de 担心: dejas de cargar el peso.",
      }),
      w("热心", "rè xīn", ["caliente", "corazón"], "entusiasta, servicial", { lit: "corazón caliente" }),
      w("小心", "xiǎo xīn", ["pequeño", "corazón"], "¡cuidado!, tener cuidado", {
        lit: "corazón pequeño",
        nota: "No es tan obvia, pero ayuda imaginar el corazón encogido de tensión cuando prestas mucha atención.",
      }),
      w("心脏", "xīn zàng", ["corazón", "órgano"], "corazón (el órgano)", {
        nota: "脏 se lee zàng cuando significa «órgano» y zāng cuando significa «sucio». Mismo carácter, dos lecturas.",
      }),
    ],
  },
];

const porHanzi = new Map(familias.map((f) => [f.raiz.h, f]));

export function familiaDe(hanzi: string): Familia | undefined {
  return porHanzi.get(hanzi);
}

export function familiaPorSlug(slug: string): Familia | undefined {
  return familias.find((f) => f.slug === slug);
}
