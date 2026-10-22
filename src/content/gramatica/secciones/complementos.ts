import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const pao = w("跑", "pǎo", ["correr"]);
const chang = w("唱", "chàng", ["cantar"]);
const xiezi = w("写字", "xiě zì", ["escribir", "carácter"], "escribir a mano");
const kanwan = w("看完", "kàn wán", ["leer", "terminar"], "terminar de leer");
const tingdong = w("听懂", "tīng dǒng", ["escuchar", "entender"], "entender (oyendo)");
const zhao = w("找", "zhǎo", ["buscar"]);
const zhaodao = w("找到", "zhǎo dào", ["buscar", "llegar"], "encontrar");

export const complementos: Seccion = {
  slug: "complementos",
  titulo: "Complementos del verbo",
  hanzi: "补语",
  resumen: "Lo que va después del verbo para decir cómo terminó la acción, hacia dónde fue o qué tan bien se hizo.",
  intro: [
    "Es la parte más propia del chino y la que más cuesta. El verbo dice la acción y el complemento, su resultado: 看 «mirar» frente a 看见 «ver», 找 «buscar» frente a 找到 «encontrar».",
    "Lo más parecido en inglés son los phrasal verbs (look up, find out), pero en chino la lógica es más regular: cada parte conserva su significado.",
  ],
  temas: [
    {
      slug: "grado",
      titulo: "Cómo se hace algo: verbo + 得",
      hanzi: "动词 + 得 + 形容词",
      nivel: "HSK 2",
      resumen:
        "Para decir cómo o qué tan bien se hace algo, la evaluación va después del verbo con 得: 他说得很快, «él habla rápido».",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "他" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "说" },
        { rol: "particula", etiqueta: "得", ejemplo: "得" },
        { rol: "complemento", etiqueta: "Cómo", ejemplo: "很快" },
      ],
      explicacion: [
        "En español el adverbio va junto al verbo: «habla rápido», «canta bien». En chino primero se dice la acción y después se evalúa con 得 (de): 他说得很快, «él habla (en cuanto a hablar) muy rápido».",
        "Después de 得 va un adjetivo, normalmente con 很 u otra palabra de grado, igual que en una oración con adjetivo: 很好, 不好, 非常快.",
        "Si el verbo tiene objeto, hay un problema: 得 tiene que ir pegado al verbo. Por eso se repite el verbo (他说中文说得很好) o se adelanta el objeto (他中文说得很好).",
        "Para negar, el 不 va en la evaluación, no en el verbo: 他说得不快.",
      ],
      tabla: {
        columnas: ["Caso", "Chino", "Español"],
        filas: [
          ["sin objeto", "他跑得很快。", "Él corre rápido."],
          ["negación", "他跑得不快。", "Él no corre rápido."],
          ["con objeto: repetir el verbo", "他说中文说得很好。", "Él habla muy bien chino."],
          ["con objeto: adelantarlo", "他中文说得很好。", "Él habla muy bien chino."],
          ["pregunta", "他说得怎么样？", "¿Qué tal habla?"],
        ],
      },
      ejemplos: [
        s([v.ta, pao, v.deGrado, v.hen, v.kuai, "。"], "Él corre muy rápido.", { lit: "Él correr (grado) muy rápido." }),
        s([v.ni, v.shuo, v.deGrado, v.hen, v.hao, "。"], "Hablas muy bien."),
        s([v.taElla, v.changge, chang, v.deGrado, v.hen, v.hao, "。"], "Ella canta muy bien.", {
          nota: "唱歌 es «cantar canción»: el verbo 唱 se repite para pegarle 得.",
        }),
        s([v.ta, v.zhongwen, v.shuo, v.deGrado, v.hen, v.hao, "。"], "Él habla muy bien chino.", {
          nota: "El objeto (中文) se adelanta y el verbo no se repite.",
        }),
        s([v.wo, xiezi, v.xie, v.deGrado, v.bu, v.hao, "。"], "No escribo bien los caracteres."),
      ],
      errores: [
        {
          mal: "他说中文得很好。",
          bien: "他说中文说得很好。",
          porque: "得 va pegado al verbo, no al objeto. Repite el verbo o adelanta el objeto.",
        },
        {
          mal: "他很好唱歌。",
          bien: "他唱歌唱得很好。",
          porque: "Calco de «canta bien». La evaluación va después del verbo, con 得.",
        },
        { mal: "他不跑得快。", bien: "他跑得不快。", porque: "La negación va en la evaluación." },
      ],
      matices: [
        "的, 得 y 地 se pronuncian igual (de). 得 va después del verbo y 的, antes de un sustantivo. Hasta los nativos los confunden al escribir.",
        "得 tiene otras lecturas: dé («obtener», en 得到) y děi («tener que»). Aquí es la partícula neutra de.",
      ],
      relacionados: ["particulas/de", "adjetivos/comparativos", "adjetivos/adjetivos-como-verbos"],
    },
    {
      slug: "resultado",
      titulo: "Complemento de resultado",
      hanzi: "看完 · 听懂 · 找到",
      nivel: "HSK 2",
      resumen:
        "Un segundo verbo o adjetivo pegado al primero dice cómo terminó la acción: 看 «mirar» + 完 «terminar» = 看完 «terminar de ver».",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我" },
        { rol: "verbo", etiqueta: "Acción", ejemplo: "听" },
        { rol: "complemento", etiqueta: "Resultado", ejemplo: "懂" },
        { rol: "particula", etiqueta: "了", ejemplo: "了" },
      ],
      explicacion: [
        "En chino, la acción y su resultado son cosas separadas. 看 es solo «mirar»: no dice si viste algo. Para decir que lo lograste, se agrega el resultado: 看见 «ver» (mirar + percibir).",
        "Es la misma lógica de los compuestos verbo-resultado de «Cómo se arman las palabras»: cada mitad conserva su significado.",
        "Por eso en chino se puede «buscar sin encontrar» sin contradicción: 找 (buscar) frente a 找到 (buscar + llegar = encontrar).",
        "Normalmente va con 了, porque el resultado ya se logró. La negación es 没: 我没听懂, «no entendí».",
      ],
      tabla: {
        columnas: ["Complemento", "Idea", "Ejemplo", "Español"],
        filas: [
          ["完 wán", "terminar", "看完", "terminar de ver o leer"],
          ["懂 dǒng", "entender", "听懂", "entender (al escuchar)"],
          ["到 dào", "llegar, lograr", "找到", "encontrar"],
          ["见 jiàn", "percibir", "看见", "ver"],
          ["好 hǎo", "bien, listo", "做好", "dejar hecho"],
          ["错 cuò", "error", "写错", "escribir mal"],
        ],
      },
      ejemplos: [
        s([v.wo, kanwan, v.le, v.zhe, v.ben, v.shu, "。"], "Terminé de leer este libro.", {
          lit: "Yo leer-terminar 了 este volumen libro.",
        }),
        s([v.ni, tingdong, v.le, v.ma, "？"], "¿Entendiste?", { lit: "Tú escuchar-entender 了 吗?" }),
        s([v.wo, v.mei, tingdong, "。"], "No entendí.", { nota: "Con 没 no va 了." }),
        s([v.wo, zhaodao, v.le, v.wo, v.de, v.shouji, "。"], "Encontré mi celular.", {
          lit: "Yo buscar-llegar 了 yo 的 celular.",
        }),
        s([v.wo, zhao, v.le, "，", v.danshi, v.mei, zhaodao, "。"], "Busqué, pero no lo encontré.", {
          nota: "En español «buscar» y «encontrar» son verbos distintos; en chino es el mismo verbo, con o sin resultado.",
        }),
        s([v.fan, v.zuohao, v.le, "。"], "La comida está lista.", { lit: "Comida hacer-bien 了." }),
      ],
      errores: [
        {
          mal: "我看了这本书完。",
          bien: "我看完了这本书。",
          porque: "El resultado va pegado al verbo; 了 y el objeto van después.",
        },
        { mal: "我不听懂。", bien: "我没听懂。", porque: "Para un resultado que no se logró, se usa 没." },
      ],
      matices: [
        "听懂 y 懂 no son iguales: 我懂 es «entiendo (el tema)» y 我听懂了, «entendí lo que escuché». Lo mismo con 看懂, «entender al leer».",
        "La forma potencial (看得懂 «puedo entenderlo», 看不懂 «no puedo») es otro tema: el complemento potencial.",
      ],
      relacionados: ["complementos/grado", "tiempo-y-aspecto/el-verbo-no-cambia", "pasiva-y-ba/ba"],
    },
    pendiente("direccion", "Complemento de dirección", "进来 · 出去"),
    pendiente("potencial", "Complemento potencial", "看得懂 · 看不懂"),
    pendiente("duracion", "Duración y cantidad de veces", "学了两年 · 去过三次"),
  ],
};
