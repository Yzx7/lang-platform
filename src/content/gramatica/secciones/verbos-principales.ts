import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const gege = w("哥哥", "gē ge", ["hermano mayor", "hermano mayor"], "hermano mayor");
const meiyouVerbo = w("没有", "méi yǒu", ["no", "haber"], "no hay");

export const verbosPrincipales: Seccion = {
  slug: "verbos-principales",
  titulo: "Verbos principales",
  hanzi: "动词",
  resumen: "Los verbos que sostienen todo: 是, 有 y 在, y los modales para querer, poder y saber.",
  intro: [
    "En Sherton, esta sección era «to be», «to have» y los modales (can, must, should). En chino pasa algo parecido: tres verbos básicos se reparten el trabajo de «ser», «estar», «tener» y «haber», y un grupo de modales va antes del verbo principal.",
    "El verbo chino nunca se conjuga: no cambia por persona, número ni tiempo.",
  ],
  temas: [
    {
      slug: "ser-tener-estar",
      titulo: "是, 有 y 在: ser, tener/haber y estar",
      hanzi: "是 · 有 · 在",
      nivel: "HSK 1",
      resumen:
        "Lo que en español hacen «ser», «estar», «tener» y «haber», en chino se reparte distinto: 是 identifica, 有 posee o hace existir y 在 ubica.",
      explicacion: [
        "是 (shì) une dos sustantivos: A es B. 我是学生, 这是我的书. No se usa con adjetivos (eso está en «El adjetivo funciona como verbo»).",
        "有 (yǒu) es «tener» y también «haber». 我有一本书, «tengo un libro». Si en vez de una persona pones un lugar, significa «hay»: 桌子上有一本书, «sobre la mesa hay un libro» (literal: la mesa-sobre tiene un libro).",
        "在 (zài) dice dónde está algo: 书在桌子上, «el libro está sobre la mesa». Es el «estar» de ubicación. El «estar» de estado (cansado, ocupado) es un adjetivo y no usa ninguno de los tres.",
        "有 y 在 son dos caras de la misma situación. Con 有, el lugar va primero y lo que hay es nuevo («hay un libro»). Con 在, la cosa va primero y ya se sabe cuál es («el libro está…»).",
        "Las negaciones son 不是, 没有 (nunca ✗不有) y 不在.",
      ],
      tabla: {
        columnas: ["Español", "Patrón", "Chino"],
        filas: [
          ["Soy estudiante.", "A 是 B", "我是学生。"],
          ["Tengo un libro.", "persona 有 cosa", "我有一本书。"],
          ["Sobre la mesa hay un libro.", "lugar 有 cosa", "桌子上有一本书。"],
          ["El libro está sobre la mesa.", "cosa 在 lugar", "书在桌子上。"],
          ["Mamá no está en casa.", "不在", "妈妈不在家。"],
          ["Aquí no hay nadie.", "没有", "这里没有人。"],
        ],
      },
      ejemplos: [
        s([v.wo, v.shi, v.xuesheng, "。"], "Soy estudiante.", { tipo: "+" }),
        s([v.wo, v.you, v.yi, v.ge, gege, "。"], "Tengo un hermano mayor.", { tipo: "+" }),
        s([v.zhuozi, v.shang, v.you, v.yi, v.ben, v.shu, "。"], "Sobre la mesa hay un libro.", { tipo: "+",
          lit: "Mesa-sobre tener un volumen libro.",
        }),
        s([v.shu, v.zai, v.zhuozi, v.shang, "。"], "El libro está sobre la mesa.", { tipo: "+", lit: "Libro estar mesa-sobre." }),
        s([v.mama, v.bu, v.zai, v.jia, "。"], "Mamá no está en casa.", { tipo: "-" }),
        s([v.zheli, meiyouVerbo, v.ren, "。"], "Aquí no hay nadie.", { tipo: "-", lit: "Aquí no haber persona." }),
      ],
      errores: [
        {
          mal: "有一本书在桌子上。",
          bien: "桌子上有一本书。",
          porque: "Calco de «hay un libro sobre la mesa». Con 有, el lugar va primero.",
        },
        { mal: "我是在家。", bien: "我在家。", porque: "在 ya es el verbo «estar»: no se agrega 是." },
        { mal: "我不有时间。", bien: "我没有时间。", porque: "有 solo se niega con 没." },
      ],
      matices: [
        "在 tiene tres papeles: verbo «estar en» (我在家), preposición «en» antes de otro verbo (我在家看书) y marca de acción en curso (我在看书). Es la misma idea de «estar en», aplicada a un lugar o a una acción.",
        "El «estar» de estado no es 在: «estoy cansado» es 我很累.",
      ],
      relacionados: ["adjetivos/adjetivos-como-verbos", "preposiciones/lugar", "adverbios/negacion"],
    },
    {
      slug: "modales",
      titulo: "Verbos modales",
      hanzi: "想 · 要 · 会 · 能 · 可以",
      nivel: "HSK 1–2",
      resumen:
        "Van antes del verbo, como en español. La dificultad es que «poder» se divide en tres (会, 能, 可以) y «querer» en dos (想, 要).",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我" },
        { rol: "verbo", etiqueta: "Modal", ejemplo: "想" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "去" },
        { rol: "objeto", etiqueta: "Objeto", ejemplo: "中国" },
      ],
      explicacion: [
        "La posición es fácil: el modal va justo antes del verbo, como en «quiero ir» o «sé nadar». El tiempo va antes del modal y el lugar con 在, después: 我明天想在家看书.",
        "Querer: 想 (xiǎng, «pensar») es «tener ganas», suave. 要 (yào) es más firme: «quiero», «voy a», incluso «tengo que».",
        "Poder: 会 (huì) es saber hacer algo que aprendiste (nadar, manejar, hablar chino). 能 (néng) es poder por capacidad o por las circunstancias («hoy no puedo, estoy enfermo»). 可以 (kěyǐ) es tener permiso.",
        "Este 会 es el mismo de 会下雨 («va a llover»): tiene dos usos, saber hacer algo y predecir.",
      ],
      tabla: {
        columnas: ["Modal", "Idea", "Ejemplo", "Español"],
        filas: [
          ["想 xiǎng", "tener ganas", "我想喝咖啡。", "Me gustaría tomar un café."],
          ["要 yào", "querer (firme), ir a", "我要去北京。", "Voy a ir a Pekín."],
          ["会 huì", "saber hacer (aprendido)", "我会游泳。", "Sé nadar."],
          ["能 néng", "poder (capacidad, circunstancias)", "我今天不能去。", "Hoy no puedo ir."],
          ["可以 kěyǐ", "poder (permiso)", "这里可以抽烟吗？", "¿Se puede fumar aquí?"],
        ],
      },
      ejemplos: [
        s([v.wo, v.xiang, v.he, v.kafei, "。"], "Me gustaría tomar un café.", { tipo: "+", lit: "Yo pensar beber café." }),
        s([v.wo, v.yao, v.qu, v.beijing, "。"], "Voy a ir a Pekín.", { tipo: "+" }),
        s([v.ta, v.huiSaber, v.shuo, v.zhongwen, "。"], "Él habla chino.", { tipo: "+",
          lit: "Él saber hablar chino.",
          nota: "En español decimos «habla chino»; en chino se dice que sabe hablarlo.",
        }),
        s([v.wo, v.jintian, v.hen, v.mang, "，", v.bu, v.neng, v.qu, "。"], "Hoy estoy ocupado, no puedo ir.", { tipo: "-" }),
        s([v.wo, v.keyi, v.yong, v.ni, v.de, v.shouji, v.ma, "？"], "¿Puedo usar tu celular?", { tipo: "?" }),
        s([v.wo, v.mingtian, v.xiang, v.zai, v.jia, v.kan, v.shu, "。"], "Mañana quiero leer en casa.", { tipo: "+",
          nota: "Tiempo antes del modal; 在家 después.",
        }),
      ],
      errores: [
        {
          mal: "我可以说中文。",
          bien: "我会说中文。",
          porque: "Para «sé hablar chino» se usa 会. 可以 es permiso: sonaría a «me dejan hablar chino».",
        },
        { mal: "我去想中国。", bien: "我想去中国。", porque: "El modal va antes del verbo, como en español." },
        { mal: "我想去中国明天。", bien: "我明天想去中国。", porque: "El tiempo va antes del modal y del verbo, nunca al final." },
      ],
      matices: [
        "«No quiero» casi siempre es 不想. 不要 suena a orden: 不要喝！, «¡no tomes!».",
        "要 también es «tener que» o «necesitar»: al pedir, 我要一杯咖啡 es «quiero un café». En el sentido de «tener que», la negación es 不用 («no hace falta»).",
        "Al pedir permiso, 能 y 可以 se mezclan bastante (我能…吗？ / 我可以…吗？). La diferencia que más importa es la de 会.",
      ],
      relacionados: ["tiempo-y-aspecto/el-verbo-no-cambia", "estructura/orden-de-la-oracion", "adverbios/negacion"],
    },
    pendiente("deber", "Deber y tener que", "应该 · 得 · 要"),
    pendiente("verbos-duplicados", "Verbos duplicados", "看看 · 试一试"),
  ],
};
