import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const bi = w("比", "bǐ", ["comparar"], "(más) que");
const duo = w("多", "duō", ["mucho"]);
const yidian = w("一点", "yī diǎn", ["uno", "punto"], "un poco");

export const adjetivos: Seccion = {
  slug: "adjetivos",
  titulo: "Adjetivos",
  hanzi: "形容词",
  resumen: "Funcionan como verbos: 我很忙 ya es «estoy ocupado», sin «ser» ni «estar».",
  intro: [
    "Un adjetivo chino puede ser, por sí solo, el predicado de la oración. Eso cambia cómo se dice «es caro», «estoy cansado» o «hace calor», y también cómo se compara.",
    "Cuando el adjetivo describe a un sustantivo, va antes y con 的: 很贵的咖啡, «un café muy caro».",
  ],
  temas: [
    {
      slug: "adjetivos-como-verbos",
      titulo: "El adjetivo funciona como verbo",
      hanzi: "主语 + 很 + 形容词",
      nivel: "HSK 1",
      resumen:
        "是 une dos sustantivos (A = B). Los adjetivos no lo necesitan: ya funcionan como verbos y se enlazan con 很.",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我" },
        { rol: "adverbio", etiqueta: "很 (enlace)", ejemplo: "很" },
        { rol: "verbo", etiqueta: "Adjetivo", ejemplo: "忙" },
      ],
      explicacion: [
        "El español tiene «ser» y «estar»; el chino no tiene ninguno de los dos tal cual. 是 (shì) solo dice que A es B, entre sustantivos: 我是学生 «soy estudiante», 他是老师 «él es profesor».",
        "Con adjetivos no va 是. En chino el adjetivo funciona como verbo: 忙 ya significa «estar ocupado» y 高, «ser alto». Por eso 我忙 ya es una oración completa.",
        "En la práctica, casi siempre se pone 很 (hěn) en medio: 我很忙. 很 hace de enlace y apenas aporta «muy». Sin 很, la oración suena a comparación: 我忙，他不忙, «yo estoy ocupado, él no».",
        "Para negar se usa 不 directo, sin 很 ni 是: 我不忙.",
      ],
      tabla: {
        columnas: ["Quieres decir", "Patrón", "Chino"],
        filas: [
          ["Soy estudiante.", "A 是 B", "我是学生。"],
          ["No soy profesor.", "A 不是 B", "我不是老师。"],
          ["Estoy ocupado.", "A 很 + adjetivo", "我很忙。"],
          ["No estoy ocupado.", "A 不 + adjetivo", "我不忙。"],
          ["Él es alto.", "A 很 + adjetivo", "他很高。"],
          ["Hoy hace calor.", "A 很 + adjetivo", "今天很热。"],
        ],
      },
      ejemplos: [
        s([v.wo, v.shi, v.xuesheng, "。"], "Soy estudiante.", { tipo: "+", lit: "Yo ser estudiante." }),
        s([v.ta, v.shi, v.zhongguoren, "。"], "Él es chino.", { tipo: "+",
          lit: "Él ser China-persona.",
          nota: "País + 人 forma la nacionalidad.",
        }),
        s([v.wo, v.hen, v.mang, "。"], "Estoy ocupado.", { tipo: "+", nota: "Aquí 很 no se siente como «muy»: es el enlace normal." }),
        s([v.jintian, v.hen, v.re, "。"], "Hoy hace calor.", { tipo: "+",
          lit: "Hoy (enlace) caliente.",
          nota: "Ni «ser», ni «estar», ni «hacer»: el adjetivo basta.",
        }),
        s([v.ta, v.bu, v.gao, "。"], "Él no es alto.", { tipo: "-" }),
      ],
      errores: [
        { mal: "我是很忙。", bien: "我很忙。", porque: "Con adjetivos no va 是." },
        { mal: "他是高。", bien: "他很高。", porque: "Calco de «él es alto». 高 ya incluye el «ser»." },
        { mal: "我不是忙。", bien: "我不忙。", porque: "Un adjetivo se niega con 不 directo." },
      ],
      matices: [
        "是 sí puede aparecer con un adjetivo para confirmar algo, con énfasis: 他是很高, «sí que es alto (como dijiste)». Es un uso especial, no la forma normal.",
        "很 sí significa «muy» cuando lo acentúas al hablar. Para un «muy» claro se usa 非常 (fēicháng) o 太…了.",
      ],
      relacionados: ["verbos-principales/ser-tener-estar", "adjetivos/comparativos", "adverbios/negacion"],
    },
    {
      slug: "comparativos",
      titulo: "Comparar: A 比 B + adjetivo",
      hanzi: "A 比 B + 形容词",
      nivel: "HSK 2",
      resumen: "Para «A es más… que B» no hace falta «más»: 比 ya lo dice. 他比我高: él es más alto que yo.",
      formula: [
        { rol: "sujeto", etiqueta: "A", ejemplo: "他" },
        { rol: "conector", etiqueta: "比", ejemplo: "比" },
        { rol: "objeto", etiqueta: "B", ejemplo: "我" },
        { rol: "verbo", etiqueta: "Adjetivo", ejemplo: "高" },
      ],
      explicacion: [
        "比 (bǐ) significa «comparar». La frase literal es «él, comparado conmigo, alto»: 他比我高. El «más» ya está implícito, así que no se agrega.",
        "Tampoco va 很: 很 sirve para describir sin comparar. Para «mucho más» se pone 得多 o 多了 después del adjetivo: 他比我高得多.",
        "Para «un poco más» se usa 一点 (o 一点儿) después del adjetivo: 今天比昨天热一点.",
        "Para negar, lo más natural es 没有: 我没有他高, «no soy tan alto como él».",
      ],
      tabla: {
        columnas: ["Idea", "Chino", "Español"],
        filas: [
          ["más", "他比我高。", "Él es más alto que yo."],
          ["mucho más", "他比我高得多。", "Él es mucho más alto que yo."],
          ["un poco más", "今天比昨天热一点。", "Hoy hace un poco más de calor que ayer."],
          ["no tan… como", "我没有他高。", "No soy tan alto como él."],
        ],
      },
      ejemplos: [
        s([v.ta, bi, v.wo, v.gao, "。"], "Él es más alto que yo.", { tipo: "+", lit: "Él comparar yo alto." }),
        s([v.kafei, bi, v.cha, v.gui, "。"], "El café es más caro que el té.", { tipo: "+" }),
        s([v.jintian, bi, v.zuotian, v.re, yidian, "。"], "Hoy hace un poco más de calor que ayer.", { tipo: "+" }),
        s([v.ta, bi, v.wo, v.gao, v.deGrado, duo, "。"], "Él es mucho más alto que yo.", { tipo: "+",
          lit: "Él comparar yo alto (grado) mucho.",
        }),
        s([v.wo, v.meiyou, v.ta, v.gao, "。"], "No soy tan alto como él.", { tipo: "-", lit: "Yo no tener él alto." }),
      ],
      errores: [
        { mal: "他比我很高。", bien: "他比我高。", porque: "En una comparación no va 很." },
        { mal: "他是比我高。", bien: "他比我高。", porque: "Calco de «es más alto». 比 + adjetivo ya hace de verbo." },
        { mal: "他高比我。", bien: "他比我高。", porque: "El orden es A 比 B, con el adjetivo al final." },
      ],
      matices: [
        "更 (gèng, «aún más») sí puede ir: 他比我更高, «él es todavía más alto que yo» (los dos son altos).",
        "不比 existe, pero no es el opuesto directo: 我不比他高 es «no soy más alto que él» (somos parecidos, o lo estás contradiciendo). Para «menos que», usa 没有.",
      ],
      relacionados: ["adjetivos/adjetivos-como-verbos", "complementos/grado"],
    },
    pendiente("modificar-sustantivos", "Adjetivo + 的 + sustantivo", "很贵的咖啡"),
    pendiente("intensificadores", "Intensificadores", "非常 · 太…了 · 有点儿"),
    pendiente("superlativo", "El superlativo: 最", "最"),
    pendiente("igualdad", "Igual que: 跟…一样", "跟…一样"),
    pendiente("duplicacion", "Adjetivos duplicados", "慢慢 · 高高兴兴"),
  ],
};
