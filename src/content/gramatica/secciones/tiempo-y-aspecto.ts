import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const kaoya = w("烤鸭", "kǎo yā", ["asar", "pato"], "pato asado");
const jian = w("见", "jiàn", ["ver"]);

export const tiempoYAspecto: Seccion = {
  slug: "tiempo-y-aspecto",
  titulo: "Tiempo y aspecto",
  hanzi: "时态",
  resumen:
    "No hay tiempos verbales. Unas pocas partículas dicen si la acción está en curso, terminada o es una experiencia.",
  intro: [
    "En inglés y en español, esta sería la sección más larga: presente, pasado, futuro, perfecto, continuo… En chino el verbo no cambia, y el «cuándo» lo dicen las palabras de tiempo (昨天, 明天).",
    "Lo que sí marca el chino es el aspecto: cómo está la acción (en curso, completada, vivida alguna vez). Es otra forma de pensar el tiempo, y por eso no conviene traducir 了 como «pasado».",
  ],
  temas: [
    {
      slug: "el-verbo-no-cambia",
      titulo: "El verbo no cambia: 在, 了 y 会",
      hanzi: "在 · 了 · 会",
      nivel: "HSK 1–2",
      resumen:
        "En chino el verbo nunca se conjuga. El momento de la acción se marca con partículas, como un filtro sobre la misma foto.",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "他" },
        { rol: "particula", etiqueta: "在 / 会", ejemplo: "在" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "写" },
        { rol: "particula", etiqueta: "了", ejemplo: "了" },
        { rol: "objeto", etiqueta: "Objeto", ejemplo: "报告" },
      ],
      explicacion: [
        "En español, «escribir» cambia a escribo, escribí, escribiré, estoy escribiendo… En chino, 写 (xiě) es siempre 写. Lo que cambia son las palabras de alrededor.",
        "在 antes del verbo indica que la acción está en curso. Es el mismo 在 de «en (un lugar)»: estar «en» la acción.",
        "了 después del verbo (o al final) indica que la acción se completó o que algo cambió.",
        "会 antes del verbo indica que algo va a pasar o es probable.",
      ],
      tabla: {
        columnas: ["Partícula", "Posición", "Idea", "Ejemplo"],
        filas: [
          ["在 zài", "antes del verbo", "en curso", "他在写报告。"],
          ["了 le", "después del verbo o al final", "completado / cambio", "妈妈回来了。"],
          ["会 huì", "antes del verbo", "va a pasar", "明天会下雨。"],
        ],
      },
      ejemplos: [
        s(
          [w("姐姐", "jiě jie", ["hermana mayor", "hermana mayor"], "hermana"), v.zaiProg, v.kan, w("报纸", "bào zhǐ", ["noticia", "papel"], "periódico"), "。"],
          "Mi hermana está leyendo el periódico.",
        ),
        s([v.ta, v.zaiProg, v.xie, w("报告", "bào gào", ["informar", "decir"], "informe"), "。"], "Él está escribiendo un informe.", { tipo: "+" }),
        s([v.mama, w("回来", "huí lai", ["volver", "venir"], "regresar"), v.le, "。"], "Mamá ya regresó.", { tipo: "+" }),
        s([v.ta, v.mai, v.le, v.kafei, "。"], "Él compró café.", {
          tipo: "+",
          nota: "También se dice 他买咖啡了. Las dos son correctas, con un matiz distinto.",
        }),
        s([v.mingtian, v.huiFut, v.xiayu, "。"], "Mañana va a llover.", { tipo: "+" }),
        s([v.women, v.mingtian, v.huiFut, v.jianmian, "。"], "Mañana nos vamos a ver.", { tipo: "+" }),
      ],
      errores: [
        { mal: "他了买咖啡。", bien: "他买了咖啡。", porque: "了 va pegado después del verbo (o al final de la oración), nunca antes." },
        { mal: "我没去了。", bien: "我没去。", porque: "Con 没 («no hice») no se usa 了: 没 ya dice que la acción no se completó." },
      ],
      matices: [
        "了 no es el «pasado». Marca que algo se completó o cambió. Puede ir en futuro (明天吃了饭再走: «mañana, cuando hayas comido, te vas») y hay oraciones en pasado sin 了 (我昨天在家看书).",
        "会 expresa sobre todo predicción o probabilidad. Para planes se suele usar 要: 我明天要去北京 («mañana voy a Pekín»).",
      ],
      relacionados: ["tiempo-y-aspecto/experiencia", "estructura/orden-de-la-oracion", "adverbios/negacion"],
    },
    {
      slug: "experiencia",
      titulo: "«Alguna vez»: 过",
      hanzi: "动词 + 过",
      nivel: "HSK 2",
      resumen: "过 después del verbo dice que algo se ha vivido alguna vez. No importa cuándo: importa la experiencia.",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "去" },
        { rol: "particula", etiqueta: "过", ejemplo: "过" },
        { rol: "objeto", etiqueta: "Objeto", ejemplo: "中国" },
      ],
      explicacion: [
        "过 (guò) significa «pasar, cruzar». Pegado a un verbo, dice que ya «pasaste por» esa experiencia: 我去过中国, «he estado en China (alguna vez)».",
        "Equivale al «he… alguna vez» del español o al «have you ever…» del inglés. No dice cuándo ocurrió.",
        "La negación es 没 + verbo + 过: 我没去过中国, «nunca he estado en China». Aquí el 过 se mantiene, a diferencia de 了, que desaparece con 没.",
        "Para preguntar: 你去过中国吗？",
      ],
      tabla: {
        columnas: ["Forma", "Chino", "Español"],
        filas: [
          ["afirmativa", "我去过中国。", "He estado en China."],
          ["negativa", "我没去过中国。", "Nunca he estado en China."],
          ["pregunta", "你去过中国吗？", "¿Has estado en China?"],
          ["con 了 (contraste)", "他去了中国。", "Se fue a China (y quizá sigue allá)."],
        ],
      },
      ejemplos: [
        s([v.wo, v.qu, v.guo, v.zhongguo, "。"], "He estado en China.", { tipo: "+", lit: "Yo ir (pasar por) China." }),
        s([v.wo, v.mei, v.chi, v.guo, v.beijing, kaoya, "。"], "Nunca he comido pato laqueado de Pekín.", {
          tipo: "-",
          lit: "Yo no comer (pasar por) Pekín pato-asado.",
        }),
        s([v.ni, jian, v.guo, v.ta, v.ma, "？"], "¿Lo has visto alguna vez?", { tipo: "?" }),
        s([v.ta, v.qu, v.guo, v.zhongguo, "。"], "Él ha estado en China.", { tipo: "+", nota: "Fue y volvió: es parte de su experiencia." }),
        s([v.ta, v.qu, v.le, v.zhongguo, "。"], "Él se fue a China.", { tipo: "+", nota: "Con 了: fue, y puede que siga allá." }),
      ],
      errores: [
        { mal: "我不去过中国。", bien: "我没去过中国。", porque: "La experiencia se niega con 没, nunca con 不." },
        { mal: "我去中国过。", bien: "我去过中国。", porque: "过 va pegado al verbo, antes del objeto." },
      ],
      matices: [
        "过 no es el pasado: habla de experiencia, por eso suele ir sin una fecha exacta. Para contar qué hiciste en un momento concreto se usa normalmente 了.",
      ],
      relacionados: ["tiempo-y-aspecto/el-verbo-no-cambia", "adverbios/negacion"],
    },
    {
      slug: "todas-las-formas",
      titulo: "Un verbo en todas sus formas",
      hanzi: "看书 · 在看书 · 看了 · 看过",
      nivel: "HSK 1–2",
      resumen:
        "Lo que en inglés son 12 tiempos, en chino son unas pocas piezas alrededor de un verbo que nunca cambia. Esta tabla es el constructor: elige el aspecto y la forma.",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我" },
        { rol: "tiempo", etiqueta: "Cuándo", ejemplo: "昨天" },
        { rol: "particula", etiqueta: "在 / 没 / 不 / 会", ejemplo: "没" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "看" },
        { rol: "particula", etiqueta: "了 / 过", ejemplo: "过" },
        { rol: "particula", etiqueta: "吗", ejemplo: "吗" },
      ],
      explicacion: [
        "En inglés, cada tiempo pide su auxiliar y su forma del verbo (do, did, done, doing, does). En chino el verbo 看 es siempre 看; lo que cambia son las piezas de alrededor, y casi todas tienen un lugar fijo: 在, 没, 不 y 会 antes del verbo; 了 y 过 después; 吗 al final.",
        "La tabla no tiene oraciones: tiene las piezas para armarlas. Elige el aspecto (la fila) y si quieres afirmar, negar o preguntar (la columna).",
        "El «cuándo» va aparte, con palabras de tiempo antes del verbo (昨天, 现在, 明天). Por eso el tiempo y el aspecto se combinan libremente: se puede estar haciendo algo ayer, ahora o mañana con el mismo 在.",
      ],
      tabla: {
        columnas: ["Aspecto", "＋ Afirmativa", "− Negativa", "? Pregunta"],
        filas: [
          ["General, costumbre", "verbo", "不 + verbo", "verbo + 吗"],
          ["En curso", "在 + verbo", "没在 + verbo", "在 + verbo + 吗"],
          ["Completado", "verbo + 了", "没 + verbo", "verbo + 了吗"],
          ["Experiencia", "verbo + 过", "没 + verbo + 过", "verbo + 过 + 吗"],
          ["Va a pasar", "会 + verbo", "不会 + verbo", "会 + verbo + 吗"],
        ],
      },
      ejemplos: [
        s([v.wo, v.kan, v.shu, "。"], "Leo (en general, por costumbre).", { tipo: "+" }),
        s([v.wo, v.bu, v.kan, v.shu, "。"], "No leo.", { tipo: "-" }),
        s([v.ni, v.kan, v.shu, v.ma, "？"], "¿Lees?", { tipo: "?" }),
        s([v.wo, v.zaiProg, v.kan, v.shu, "。"], "Estoy leyendo.", { tipo: "+" }),
        s([v.wo, v.mei, v.zaiProg, v.kan, v.shu, "。"], "No estoy leyendo.", { tipo: "-" }),
        s([v.wo, v.kan, v.shu, v.le, "。"], "Ya leí.", {
          tipo: "+",
          nota: "Con objeto corto, 了 suele ir al final (看书了). Con un objeto más concreto va pegado al verbo: 我看了这本书.",
        }),
        s([v.wo, v.mei, v.kan, v.shu, "。"], "No leí.", { tipo: "-", nota: "Con 没 desaparece el 了." }),
        s([v.ni, v.kan, v.shu, v.le, v.ma, "？"], "¿Leíste?", { tipo: "?" }),
        s([v.wo, v.kan, v.guo, v.zhe, v.ben, v.shu, "。"], "He leído este libro (alguna vez).", { tipo: "+" }),
        s([v.wo, v.mei, v.kan, v.guo, v.zhe, v.ben, v.shu, "。"], "Nunca he leído este libro.", {
          tipo: "-",
          nota: "Aquí 过 se queda, a diferencia de 了.",
        }),
        s([v.wo, v.mingtian, v.yao, v.kan, v.shu, "。"], "Mañana voy a leer.", {
          tipo: "+",
          nota: "Para un plan se usa 要; 会 es más una predicción («va a pasar»).",
        }),
      ],
      errores: [
        { mal: "我没在看书了。", bien: "我没在看书。", porque: "Con 没 no va 了." },
        { mal: "我不看过这本书。", bien: "我没看过这本书。", porque: "La experiencia se niega con 没, como todo lo que pasó o no pasó." },
        {
          mal: "我看了这本书昨天。",
          bien: "我昨天看了这本书。",
          porque: "Calco de «leí este libro ayer». El cuándo va antes del verbo; 了 no lo reemplaza.",
        },
      ],
      matices: [
        "El cuándo y el aspecto son dos ejes separados. En curso ayer: 昨天晚上我在看书 («anoche estaba leyendo»). En curso mañana: 明天这个时候我在看书 («mañana a esta hora estaré leyendo»). Completado en el futuro: 明天我看了书再去 («mañana, cuando haya leído, voy»).",
        "Por eso 了 no es «pasado» ni 在 es «presente»: el mismo 在 sirve para «estaba», «estoy» y «estaré» leyendo.",
      ],
      relacionados: ["tiempo-y-aspecto/el-verbo-no-cambia", "tiempo-y-aspecto/experiencia", "adverbios/negacion"],
    },
    pendiente("le-de-cambio", "了 de cambio de situación", "下雨了"),
    pendiente("zhe", "Estado continuo: 着", "着"),
    pendiente("shi-de", "Enfatizar el cuándo y el cómo: 是…的", "是…的"),
    pendiente("a-punto-de", "A punto de: 快…了", "快…了 · 要…了"),
    pendiente("imperativo", "Imperativo: 请, 别, 不要", "请 · 别"),
  ],
};
