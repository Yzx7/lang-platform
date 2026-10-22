import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const yiqi = w("一起", "yī qǐ", ["uno", "levantarse"], "juntos");

export const conectores: Seccion = {
  slug: "conectores",
  titulo: "Conectores",
  hanzi: "连词",
  resumen: "Unen palabras e ideas. Muchos van en pares, uno en cada parte de la oración: 因为…所以….",
  intro: [
    "Los conectores chinos suelen ir en pareja: uno marca la primera parte y otro la segunda. En español basta con uno («como estaba cansado, me fui»); en chino es común marcar las dos.",
    "Ojo con «y»: 和 solo une sustantivos.",
  ],
  temas: [
    {
      slug: "porque-asi-que-pero",
      titulo: "Porque…, así que…; pero…",
      hanzi: "因为…所以… / 但是",
      nivel: "HSK 2",
      resumen:
        "Para explicar el porqué, la causa va primero con 因为 y el efecto después con 所以. Para contrastar, 但是 funciona como «pero».",
      formula: [
        { rol: "conector", etiqueta: "因为", ejemplo: "因为" },
        { rol: "sujeto", etiqueta: "Causa", ejemplo: "我很累" },
        { rol: "conector", etiqueta: "所以", ejemplo: "所以" },
        { rol: "verbo", etiqueta: "Efecto", ejemplo: "我回家睡觉" },
      ],
      explicacion: [
        "La estructura funciona como un «si… entonces…» de programación: primero la causa (因为) y luego la consecuencia (所以).",
        "En español decimos «como estaba cansado, me fui a dormir» sin «así que». En chino es muy común marcar las dos partes.",
        "但是 (pero) une dos ideas que contrastan, igual que en español.",
      ],
      ejemplos: [
        s(
          [v.yinwei, v.wo, v.hen, v.lei, "，", v.suoyi, v.wo, v.hui, v.jia, v.shuijiao, "。"],
          "Como estaba cansado, me fui a casa a dormir.",
          { lit: "Porque yo (enlace) cansado, por eso yo volver casa dormir." },
        ),
        s([v.yinwei, v.xiayu, "，", v.suoyi, v.women, v.bu, v.qu, v.le, "。"], "Como llueve, ya no vamos.", {
          nota: "不 se pronuncia bú antes de un 4.º tono: bú qù. Aquí 了 marca un cambio de planes («ya no»), no el pasado.",
        }),
        s([v.wo, v.hen, v.lei, "，", v.suoyi, v.hui, v.jia, v.shuijiao, v.le, "。"], "Estaba cansado, así que me fui a casa a dormir.", {
          nota: "Solo con 所以: al hablar es muy común usar uno solo de los dos conectores.",
        }),
        s(
          [v.wo, v.qu, v.zhongguo, v.kan, v.pengyou, "，", v.danshi, v.ta, v.bu, v.zai, "。"],
          "Fui a China a ver a mi amigo, pero no estaba.",
          { lit: "Yo ir China ver amigo, pero él no estar." },
        ),
      ],
      errores: [
        {
          mal: "我是很累。",
          bien: "我很累。",
          porque: "Con adjetivos no se usa 是. «Estoy cansado» no es «soy»: el adjetivo funciona como verbo y 很 hace de enlace.",
        },
      ],
      matices: [
        "Algunos cursos dicen que 因为 y 所以 siempre van juntos. No es así: el patrón completo es correcto, pero puedes usar solo uno.",
      ],
      relacionados: ["conectores/y", "condicionales/si", "estructura/cadena-de-verbos"],
    },
    {
      slug: "y",
      titulo: "和: «y» solo entre sustantivos",
      hanzi: "A 和 B",
      nivel: "HSK 1",
      resumen:
        "和 une sustantivos y pronombres (tú y yo, té y café). Para unir acciones u oraciones, el chino no usa «y»: usa una coma, 也 u otros conectores.",
      formula: [
        { rol: "sujeto", etiqueta: "Sustantivo", ejemplo: "茶" },
        { rol: "conector", etiqueta: "和", ejemplo: "和" },
        { rol: "sujeto", etiqueta: "Sustantivo", ejemplo: "咖啡" },
      ],
      explicacion: [
        "En español «y» lo une todo: palabras, acciones y oraciones. 和 (hé) solo une sustantivos o pronombres: 我和你 «tú y yo», 茶和咖啡 «té y café».",
        "Dos acciones del mismo sujeto se unen con 也 («también»): 我喜欢唱歌，也喜欢跳舞, «me gusta cantar y también bailar».",
        "Dos oraciones se unen con una coma, sin «y»: 他是老师，我是学生, «él es profesor y yo soy estudiante».",
        "和 también es «con»: 我和朋友一起去, «voy con mi amigo» (literal: yo y amigo juntos vamos).",
      ],
      tabla: {
        columnas: ["Español", "Chino", "Cómo se une"],
        filas: [
          ["té y café", "茶和咖啡", "和"],
          ["tú y yo", "你和我", "和"],
          ["Él es profesor y yo soy estudiante.", "他是老师，我是学生。", "coma"],
          ["Me gusta cantar y bailar.", "我喜欢唱歌，也喜欢跳舞。", "也"],
          ["Voy con mi amigo.", "我和朋友一起去。", "和…一起"],
        ],
      },
      ejemplos: [
        s([v.wo, v.he, v.cha, v.hePart, v.kafei, "。"], "Tomo té y café."),
        s([v.wo, v.hePart, v.ta, v.shi, v.pengyou, "。"], "Él y yo somos amigos.", { lit: "Yo y él ser amigo." }),
        s([v.ta, v.shi, v.laoshi, "，", v.wo, v.shi, v.xuesheng, "。"], "Él es profesor y yo soy estudiante.", {
          nota: "Sin «y»: basta la coma.",
        }),
        s([v.wo, v.xihuan, v.changge, "，", v.ye, v.xihuan, v.tiaowu, "。"], "Me gusta cantar y bailar."),
        s([v.wo, v.hePart, v.pengyou, yiqi, v.qu, v.beijing, "。"], "Voy a Pekín con un amigo."),
      ],
      errores: [
        { mal: "我唱歌和跳舞。", bien: "我唱歌，也跳舞。", porque: "和 no une verbos." },
        { mal: "他是老师和我是学生。", bien: "他是老师，我是学生。", porque: "和 no une oraciones: basta la coma." },
      ],
      matices: [
        "跟 (gēn) y 和 son casi intercambiables para «con»: 我跟朋友去. 跟 suena más hablado.",
        "En una lista se usa 、 (coma de enumeración) y 和 solo antes del último: 茶、咖啡和水.",
        "En textos formales verás 和 entre verbos de dos sílabas (学习和工作), pero al hablar, a nivel básico, mejor evítalo.",
      ],
      relacionados: ["conectores/porque-asi-que-pero", "adverbios/tambien-todos-solo"],
    },
    pendiente("o", "O: 或者 y 还是", "或者 · 还是"),
    pendiente("aunque", "Aunque: 虽然…但是", "虽然…但是"),
    pendiente("secuencia", "Primero…, luego…", "先…再… · 然后"),
    pendiente("no-solo", "No solo…, sino también…", "不但…而且"),
  ],
};
