import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const ai = w("爱", "ài", ["amar"]);
const ninhao = w("您好", "nín hǎo", ["usted", "bien"], "hola (con respeto)");
const nage = w("那个", "nà ge", ["ese", "(unidad)"], "ese");
const nage3 = w("哪个", "nǎ ge", ["cuál", "(unidad)"], "cuál");
const zhexie = w("这些", "zhè xiē", ["este", "algunos"], "estos");
const shei = w("谁", "shéi", ["quién"]);

export const pronombres: Seccion = {
  slug: "pronombres",
  titulo: "Pronombres",
  hanzi: "代词",
  resumen: "Pocos y sin cambios: 我 es «yo», «me» y «mí». El plural se forma con 们 y el posesivo con 的.",
  intro: [
    "El español tiene pronombres distintos según la función: yo, me, mí, conmigo. El chino tiene uno solo por persona, y el orden de la oración dice si es sujeto u objeto.",
    "Tampoco hay pronombres relativos (que, quien, cuyo): «el libro que compré» se dice 我买的书, con 的. Eso está en Partículas.",
  ],
  temas: [
    {
      slug: "personales",
      titulo: "Pronombres personales",
      hanzi: "我 · 你 · 他 · 她 · 它 · 们",
      nivel: "HSK 1",
      resumen:
        "Un solo juego de pronombres para todo: 我 es «yo», «me» y «mí». El plural se forma con 们 y el posesivo con 的.",
      explicacion: [
        "En español el pronombre cambia según su función: yo/me/mí, tú/te/ti, él/lo/le. En chino no: 我 es el mismo como sujeto (我爱你, «yo te amo») y como objeto (你爱我, «tú me amas»). La posición en la oración dice quién hace qué.",
        "El plural se forma agregando 们 (men): 我们 «nosotros», 你们 «ustedes», 他们 «ellos». No hay diferencia entre nosotros y nosotras.",
        "他 (él), 她 (ella) y 它 (eso, para cosas y animales) se pronuncian igual: tā. La diferencia solo existe por escrito; al hablar, el contexto lo aclara.",
        "您 (nín) es la forma respetuosa de 你, como «usted». Para un grupo se usa 你们 o 大家 («todos»).",
        "El posesivo no es una palabra aparte: es el pronombre + 的. 我的 es «mi» y también «mío».",
        "En inglés, cada persona tiene 5 formas distintas: I, me, my, mine, myself. En chino, las mismas 5 columnas se arman con una sola pieza: el pronombre solo, + 的 o + 自己 («uno mismo»).",
      ],
      tabla: {
        columnas: ["Persona", "Sujeto (I)", "Objeto (me)", "Posesivo + cosa (my)", "Posesivo solo (mine)", "Reflexivo (myself)"],
        filas: [
          ["yo", "我", "我", "我的", "我的", "我自己"],
          ["tú", "你", "你", "你的", "你的", "你自己"],
          ["usted", "您", "您", "您的", "您的", "您自己"],
          ["él", "他", "他", "他的", "他的", "他自己"],
          ["ella", "她", "她", "她的", "她的", "她自己"],
          ["eso (cosa, animal)", "它", "它", "它的", "它的", "它自己"],
          ["nosotros", "我们", "我们", "我们的", "我们的", "我们自己"],
          ["ustedes", "你们", "你们", "你们的", "你们的", "你们自己"],
          ["ellos, ellas", "他们 / 她们", "他们 / 她们", "他们的", "他们的", "他们自己"],
        ],
      },
      ejemplos: [
        s([v.wo, ai, v.ni, "。"], "Te amo.", { lit: "Yo amar tú." }),
        s([v.ni, ai, v.wo, v.ma, "？"], "¿Me amas?", {
          lit: "Tú amar yo 吗?",
          nota: "我 no cambia aunque sea el objeto: es «me».",
        }),
        s([v.tamen, v.shi, v.wo, v.de, v.pengyou, "。"], "Ellos son mis amigos.", {
          nota: "朋友 tampoco cambia en plural.",
        }),
        s([ninhao, "！"], "Hola (con respeto).", { lit: "Usted bien." }),
        s([v.zhe, v.shi, v.taElla, v.de, v.shu, "。"], "Este es el libro de ella.", { lit: "Esto ser ella 的 libro." }),
      ],
      errores: [
        {
          mal: "这是我书。",
          bien: "这是我的书。",
          porque: "El posesivo necesita 的. Solo se omite con la familia y las relaciones cercanas (我妈妈, 我们学校).",
        },
        {
          mal: "您们好！",
          bien: "大家好！",
          porque: "您 casi nunca lleva 们. Para saludar con respeto a un grupo se usa 大家好 («hola a todos»).",
        },
      ],
      matices: [
        "Con la familia, los amigos cercanos y las instituciones se suele omitir 的: 我妈妈, 我朋友, 我们学校. Con objetos se mantiene: 我的手机.",
        "Como en español, el sujeto se omite cuando se entiende: —去吗？ —去。 («¿Vas? —Voy.»).",
        "它 se usa poco al hablar: con cosas, lo normal es repetir el sustantivo u omitirlo.",
      ],
      relacionados: ["pronombres/demostrativos", "particulas/de"],
    },
    {
      slug: "demostrativos",
      titulo: "Demostrativos: 这, 那, 哪",
      hanzi: "这 · 那 · 哪",
      nivel: "HSK 1",
      resumen:
        "这 es «este», 那 es «ese» o «aquel» y 哪 es «cuál». Antes de un sustantivo llevan clasificador: 这本书.",
      formula: [
        { rol: "modificador", etiqueta: "这 / 那 / 哪", ejemplo: "这" },
        { rol: "particula", etiqueta: "Clasificador", ejemplo: "本" },
        { rol: "objeto", etiqueta: "Sustantivo", ejemplo: "书" },
      ],
      explicacion: [
        "El chino tiene dos distancias, no tres: 这 (zhè) para lo cercano y 那 (nà) para lo lejano. «Ese» y «aquel» son los dos 那.",
        "Solos funcionan como «esto» y «eso»: 这是我的书, «esto es mi libro».",
        "Antes de un sustantivo va un clasificador en medio: 这本书 «este libro», 那个人 «esa persona». Es la misma regla de los números: 这 y 那 ocupan el lugar del número.",
        "Con 里 (lǐ, «dentro») forman lugares: 这里 «aquí», 那里 «allí», 哪里 «dónde». En el norte se usa 儿 en vez de 里: 这儿, 那儿, 哪儿.",
        "哪 (nǎ) pregunta «cuál»: 哪本书？, «¿qué libro?». Se escribe como 那 con un 口 (boca) a la izquierda. Ese 口 aparece en muchas partículas que se usan al hablar: 吗, 呢, 吧.",
      ],
      tabla: {
        columnas: ["", "Cerca", "Lejos", "Pregunta"],
        filas: [
          ["solo", "这 esto", "那 eso", "哪 cuál"],
          ["+ clasificador", "这个 este", "那个 ese", "哪个 cuál"],
          ["lugar", "这里 aquí", "那里 allí", "哪里 dónde"],
          ["plural", "这些 estos", "那些 esos", "哪些 cuáles"],
        ],
      },
      ejemplos: [
        s([v.zhe, v.shi, v.wo, v.de, v.shu, "。"], "Este es mi libro.", { lit: "Esto ser yo 的 libro." }),
        s([nage, v.ren, v.shi, shei, "？"], "¿Quién es esa persona?", { lit: "Ese persona ser quién?" }),
        s([v.zhe, v.ben, v.shu, v.hen, v.gui, "。"], "Este libro es caro.", { lit: "Este volumen libro (enlace) caro." }),
        s([v.ni, v.yao, nage3, "？"], "¿Cuál quieres?"),
        s([v.wo, v.zai, v.zheli, "。"], "Estoy aquí."),
        s([zhexie, v.shi, v.wo, v.pengyou, v.de, "。"], "Estos son de mi amigo.", {
          nota: "些 es un clasificador de plural indefinido: «algunos».",
        }),
      ],
      errores: [
        {
          mal: "我要这。",
          bien: "我要这个。",
          porque: "Como objeto, «esto» es 这个. 这 solo funciona bien como sujeto (这是…).",
        },
        {
          mal: "这书很贵。",
          bien: "这本书很贵。",
          porque: "Entre 这/那 y el sustantivo va un clasificador. En el habla rápida a veces se omite, pero lo estándar es ponerlo.",
        },
      ],
      matices: [
        "Antes de un clasificador, 这 también se pronuncia zhèi y 那, nèi (这个 zhèige). Es lo habitual en el norte; las dos pronunciaciones son correctas.",
      ],
      relacionados: [
        "numeros-y-clasificadores/clasificadores",
        "preguntas/palabras-para-preguntar",
        "pronombres/personales",
      ],
    },
    pendiente("reflexivo", "Reflexivo: 自己", "自己"),
    pendiente("indefinidos", "Indefinidos: todos, otros, cada", "大家 · 别人 · 每"),
    pendiente("todo-y-nada", "«Todo» y «nada» con palabras de pregunta", "谁都 · 什么都不"),
  ],
};
