import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const ruguo = w("如果", "rú guǒ", ["como, si", "fruto, resultado"], "si");
const dehua = w("的话", "de huà", ["(de)", "palabra"], "(si…)");
const yaoshi = w("要是", "yào shi", ["querer, si", "ser"], "si");
const bie = w("别", "bié", ["no (hagas)"], "no");

export const condicionales: Seccion = {
  slug: "condicionales",
  titulo: "Condicionales",
  hanzi: "条件句",
  resumen: "Un solo patrón (如果…就…) para todos los «si». El contexto dice si es real o imaginario.",
  intro: [
    "El inglés y el español distinguen varios condicionales con la forma del verbo: «si llueve», «si lloviera», «si hubiera llovido». Como el verbo chino no cambia, todos se dicen con el mismo patrón.",
  ],
  temas: [
    {
      slug: "si",
      titulo: "Si…, entonces…: 如果…就…",
      hanzi: "如果…（的话），就…",
      nivel: "HSK 2",
      resumen:
        "La condición va primero, con 如果, y el resultado después, con 就. El mismo patrón sirve para «si llueve», «si lloviera» y «si hubiera llovido».",
      formula: [
        { rol: "conector", etiqueta: "如果", ejemplo: "如果" },
        { rol: "sujeto", etiqueta: "Condición", ejemplo: "下雨" },
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我" },
        { rol: "adverbio", etiqueta: "就", ejemplo: "就" },
        { rol: "verbo", etiqueta: "Resultado", ejemplo: "不去" },
      ],
      explicacion: [
        "La condición siempre va antes que el resultado, al revés de como a veces lo decimos en español («no voy si llueve»).",
        "就 (jiù) marca el resultado y es un adverbio: va después del sujeto y antes del verbo. 如果明天下雨，我就不去. Nunca ✗就我不去.",
        "Puedes agregar 的话 (de huà) al final de la condición, o usar solo 的话, sin 如果: 下雨的话，我就不去. Al hablar, 要是 (yàoshi) es un sinónimo muy común de 如果.",
        "El chino usa el mismo patrón para lo real y lo imaginario; el contexto decide. 如果我有钱，我就去中国 puede ser «si tengo dinero, voy» o «si tuviera dinero, iría».",
      ],
      tabla: {
        columnas: ["Forma", "Chino", "Español"],
        filas: [
          ["completa", "如果明天下雨，我就不去。", "Si mañana llueve, no voy."],
          ["con 的话", "如果明天下雨的话，我就不去。", "igual"],
          ["solo 的话", "明天下雨的话，我就不去。", "igual, más hablado"],
          ["con 要是", "要是明天下雨，我就不去。", "igual, más hablado"],
          ["imaginaria", "如果我有钱，我就去中国。", "Si tuviera dinero, iría a China."],
        ],
      },
      ejemplos: [
        s([ruguo, v.mingtian, v.xiayu, "，", v.wo, v.jiu, v.bu, v.qu, "。"], "Si mañana llueve, no voy.", {
          lit: "Si mañana llover, yo entonces no ir.",
        }),
        s([ruguo, v.ni, v.mang, "，", v.wo, v.jiu, v.ziji, v.qu, "。"], "Si estás ocupado, voy solo.", {
          lit: "Si tú ocupado, yo entonces yo-mismo ir.",
        }),
        s([v.ni, v.bu, v.xiang, v.qu, dehua, "，", v.jiu, bie, v.qu, "。"], "Si no quieres ir, no vayas."),
        s([ruguo, v.wo, v.you, v.qian, "，", v.wo, v.jiu, v.qu, v.zhongguo, "。"], "Si tuviera dinero, iría a China.", {
          nota: "Es el mismo patrón que «si tengo dinero»: el contexto dice que es imaginario.",
        }),
        s([yaoshi, v.ni, v.bu, v.dong, "，", v.jiu, v.wen, v.laoshi, "。"], "Si no entiendes, pregúntale al profesor."),
      ],
      errores: [
        { mal: "我不去如果下雨。", bien: "如果下雨，我就不去。", porque: "La condición va primero." },
        {
          mal: "如果明天下雨，就我不去。",
          bien: "如果明天下雨，我就不去。",
          porque: "就 es un adverbio: va después del sujeto.",
        },
      ],
      matices: [
        "就 no es obligatorio en frases cortas, pero con él suena más natural.",
        "Para deseos imposibles («ojalá tuviera…») se usa 要是…就好了: 要是我有钱就好了, «si tuviera dinero, ¡qué bien sería!».",
      ],
      relacionados: ["conectores/porque-asi-que-pero", "adverbios/tambien-todos-solo"],
    },
    pendiente("siempre-que", "Siempre que: 只要…就", "只要…就"),
    pendiente("deseos", "Deseos: 要是…就好了", "要是…就好了"),
    pendiente("a-menos-que", "A menos que: 除非", "除非"),
  ],
};
