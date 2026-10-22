import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const xibuxihuan = w("喜不喜欢", "xǐ bu xǐ huan", ["alegrarse", "no", "alegrarse", "alegre"], "¿te gusta o no?");
const shenme = w("什么", "shén me", ["qué", "(sufijo)"], "qué");
const shei = w("谁", "shéi", ["quién"]);
const shenmeshihou = w("什么时候", "shén me shí hou", ["qué", "(sufijo)", "tiempo", "momento"], "cuándo");
const weishenme = w("为什么", "wèi shén me", ["por", "qué", "(sufijo)"], "por qué");
const duoshao = w("多少", "duō shao", ["mucho", "poco"], "cuánto");

export const preguntas: Seccion = {
  slug: "preguntas",
  titulo: "Preguntas",
  hanzi: "疑问句",
  resumen:
    "Preguntar no cambia el orden: se agrega 吗 al final o se pone la palabra para preguntar donde iría la respuesta.",
  intro: [
    "En inglés las preguntas necesitan auxiliares (do, does, did) y cambian el orden. En chino no hay nada de eso: la pregunta tiene el mismo orden que la respuesta.",
  ],
  temas: [
    {
      slug: "si-o-no",
      titulo: "Preguntas de sí o no: 吗 y V不V",
      hanzi: "…吗？ · V不V？",
      nivel: "HSK 1",
      resumen:
        "Toma una afirmación y agrega 吗 al final: ya es una pregunta. Otra forma es repetir el verbo con 不 en medio: 你去不去？",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "你" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "是" },
        { rol: "objeto", etiqueta: "Objeto", ejemplo: "学生" },
        { rol: "particula", etiqueta: "吗", ejemplo: "吗" },
      ],
      explicacion: [
        "En español, una pregunta de sí o no se distingue solo por la entonación: «¿Eres estudiante?». En chino se agrega 吗 (ma) al final de la afirmación, sin cambiar nada más: 你是学生 → 你是学生吗？",
        "La segunda forma es poner el verbo en afirmativo y en negativo, uno tras otro: 你是不是学生？ («¿eres o no eres estudiante?»), 你去不去？. Es más directa y no lleva 吗.",
        "Para responder no hay un «sí» ni un «no» universales: se repite el verbo. —你去吗？ —去。 («voy») / —不去。 («no voy»).",
        "Con verbos de dos sílabas, en V不V se suele recortar el primero: 喜不喜欢 en vez de 喜欢不喜欢.",
      ],
      tabla: {
        columnas: ["Afirmación", "Con 吗", "Con V不V"],
        filas: [
          ["你是学生。", "你是学生吗？", "你是不是学生？"],
          ["你去。", "你去吗？", "你去不去？"],
          ["你喜欢咖啡。", "你喜欢咖啡吗？", "你喜不喜欢咖啡？"],
          ["他有钱。", "他有钱吗？", "他有没有钱？"],
          ["你忙。", "你忙吗？", "你忙不忙？"],
        ],
      },
      ejemplos: [
        s([v.ni, v.shi, v.xuesheng, v.ma, "？"], "¿Eres estudiante?", { tipo: "?", lit: "Tú ser estudiante 吗?" }),
        s([v.ni, v.mang, v.ma, "？"], "¿Estás ocupado?", { tipo: "?" }),
        s([v.ni, v.qu, v.bu, v.qu, "？"], "¿Vas o no?", { tipo: "?", nota: "Se responde con el verbo: 去 («voy») o 不去 («no voy»)." }),
        s([v.ta, v.you, v.mei, v.you, v.qian, "？"], "¿Tiene dinero o no?", { tipo: "?", nota: "有 se niega con 没, también aquí." }),
        s([v.ni, xibuxihuan, v.kafei, "？"], "¿Te gusta el café?", { tipo: "?" }),
      ],
      errores: [
        { mal: "你去不去吗？", bien: "你去不去？", porque: "V不V ya es una pregunta: no se agrega 吗." },
        { mal: "你有不有钱？", bien: "你有没有钱？", porque: "有 se niega con 没." },
        { mal: "你很忙不忙？", bien: "你忙不忙？", porque: "En V不V no va 很." },
      ],
      matices: [
        "Responder 是 a cualquier pregunta suena raro: a —你去吗？, contestar —是。 es como decir «correcto». Lo natural es repetir el verbo.",
        "吧 sirve para confirmar algo que supones: 你是学生吧？, «eres estudiante, ¿no?». Está en Partículas.",
      ],
      relacionados: ["preguntas/palabras-para-preguntar", "adverbios/negacion", "particulas/tono"],
    },
    {
      slug: "palabras-para-preguntar",
      titulo: "Palabras para preguntar",
      hanzi: "什么 · 谁 · 哪里 · 什么时候 · 为什么 · 怎么 · 几 · 多少",
      nivel: "HSK 1",
      resumen:
        "Escribe la respuesta y cambia la parte que no sabes por la palabra para preguntar. El orden no se mueve.",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "你" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "去" },
        { rol: "objeto", etiqueta: "Palabra para preguntar", ejemplo: "哪里" },
      ],
      explicacion: [
        "En español empezamos con la palabra interrogativa: «¿Adónde vas?». En chino se queda donde iría la respuesta: 我去北京 → 你去哪里？ (literal: «tú vas dónde»).",
        "Funciona con todas: 他是老师 → 他是谁？; 我喝咖啡 → 你喝什么？; 我明天去 → 你什么时候去？",
        "什么时候 («cuándo») es una palabra de tiempo, así que va antes del verbo, igual que 明天. 为什么 («por qué») también va antes del verbo.",
        "Con estas palabras no se usa 吗: la pregunta ya está hecha.",
      ],
      tabla: {
        columnas: ["Palabra", "Significado", "Ejemplo"],
        filas: [
          ["什么 shénme", "qué", "你喝什么？"],
          ["谁 shéi", "quién", "他是谁？"],
          ["哪里 nǎlǐ", "dónde", "你去哪里？"],
          ["哪 + clasificador", "cuál", "你要哪个？"],
          ["什么时候 shénme shíhou", "cuándo", "你什么时候去？"],
          ["为什么 wèishénme", "por qué", "你为什么不去？"],
          ["怎么 zěnme", "cómo", "这个怎么说？"],
          ["几 jǐ", "cuántos (pocos)", "你有几个朋友？"],
          ["多少 duōshao", "cuánto", "这个多少钱？"],
        ],
      },
      ejemplos: [
        s([v.ni, v.he, shenme, "？"], "¿Qué tomas?", { tipo: "?", lit: "Tú beber qué?" }),
        s([v.ta, v.shi, shei, "？"], "¿Quién es él?", { tipo: "?", lit: "Él ser quién?" }),
        s([v.ni, v.mingtian, v.qu, v.nali, "？"], "¿Adónde vas mañana?", { tipo: "?",
          lit: "Tú mañana ir dónde?",
          nota: "Sigue valiendo el orden: el tiempo va antes del verbo.",
        }),
        s([v.ni, shenmeshihou, v.qu, v.beijing, "？"], "¿Cuándo vas a Pekín?", { tipo: "?" }),
        s([v.ni, weishenme, v.bu, v.qu, "？"], "¿Por qué no vas?", { tipo: "?" }),
        s([v.zhe, v.ge, duoshao, v.qian, "？"], "¿Cuánto cuesta esto?", { tipo: "?", lit: "Este (unidad) cuánto dinero?" }),
      ],
      errores: [
        { mal: "你是谁吗？", bien: "你是谁？", porque: "Si ya hay una palabra para preguntar (谁, 什么, 哪里…), no va 吗." },
        { mal: "哪里你去？", bien: "你去哪里？", porque: "Calco de «¿adónde vas?». La palabra para preguntar va donde iría la respuesta." },
        {
          mal: "你去北京什么时候？",
          bien: "你什么时候去北京？",
          porque: "什么时候 es una palabra de tiempo: va antes del verbo, como 明天.",
        },
      ],
      matices: [
        "哪里 y 哪儿 significan lo mismo: 哪儿 es más del norte (Pekín) y 哪里, del sur y de Taiwán.",
        "几 espera un número pequeño (menos de 10) y siempre lleva clasificador: 几个人. 多少 sirve para cualquier cantidad y el clasificador es opcional: 多少人.",
        "呢 devuelve la pregunta: 我很好，你呢？, «estoy bien, ¿y tú?».",
      ],
      relacionados: ["preguntas/si-o-no", "estructura/orden-de-la-oracion", "pronombres/demostrativos"],
    },
    pendiente("haishi", "¿Esto o aquello?: 还是", "还是"),
    pendiente("confirmacion", "Preguntas de confirmación", "对吗 · 是不是"),
  ],
};
