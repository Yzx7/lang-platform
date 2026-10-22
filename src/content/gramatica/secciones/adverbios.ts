import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const hai = w("还", "hái", ["todavía"]);
const rou = w("肉", "ròu", ["carne"]);
const zhiSolo = w("只", "zhǐ", ["solo"]);

export const adverbios: Seccion = {
  slug: "adverbios",
  titulo: "Adverbios",
  hanzi: "副词",
  resumen: "Una sola regla de posición: después del sujeto y antes del verbo. Nunca al final.",
  intro: [
    "En español los adverbios se mueven: «también voy», «voy también». En chino casi todos tienen un único lugar: justo antes del verbo o del adjetivo.",
    "La negación (不, 没) también es un adverbio y sigue la misma regla.",
  ],
  temas: [
    {
      slug: "negacion",
      titulo: "Dos «no»: 不 y 没",
      hanzi: "不 · 没（有）",
      nivel: "HSK 1",
      resumen: "不 niega lo habitual, lo que quieres y lo que es. 没 niega que algo haya pasado o que exista.",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我" },
        { rol: "adverbio", etiqueta: "不 / 没", ejemplo: "没" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "去" },
      ],
      explicacion: [
        "El español usa un solo «no» para todo. El chino lo divide: 不 (bù) para hábitos, intenciones, el futuro y los estados («no como carne», «no voy a ir», «no es caro»); 没 (méi) para decir que algo no pasó («no fui», «no comí»).",
        "Una forma de pensarlo: 不 es una decisión o un hecho general; 没 es un registro de lo que ocurrió (o no ocurrió).",
        "有 («tener», «haber») solo se niega con 没: 没有. Nunca ✗不有.",
        "是, 会 y los adjetivos se niegan con 不: 不是, 不会, 不贵.",
      ],
      tabla: {
        columnas: ["Español", "Chino", "Por qué"],
        filas: [
          ["No como carne.", "我不吃肉。", "hábito"],
          ["Mañana no voy.", "我明天不去。", "intención, futuro"],
          ["Ayer no fui.", "我昨天没去。", "no ocurrió"],
          ["Todavía no he comido.", "我还没吃饭。", "aún no ocurre"],
          ["No tengo dinero.", "我没有钱。", "有 solo va con 没"],
          ["No es caro.", "不贵。", "adjetivo"],
        ],
      },
      ejemplos: [
        s([v.wo, v.bu, v.chi, rou, "。"], "No como carne.", { tipo: "-", nota: "Hábito o decisión: no la comes en general." }),
        s([v.wo, v.mei, v.chi, rou, "。"], "No comí carne.", { tipo: "-", nota: "Hecho: en esa comida no hubo carne." }),
        s([v.ta, v.jintian, v.bu, v.lai, "。"], "Hoy él no viene.", { tipo: "-" }),
        s([v.ta, v.zuotian, v.mei, v.lai, "。"], "Ayer él no vino.", { tipo: "-" }),
        s([v.wo, v.meiyou, v.qian, "。"], "No tengo dinero.", { tipo: "-", lit: "Yo no-tener dinero." }),
        s([v.wo, hai, v.mei, v.chifan, "。"], "Todavía no he comido.", { tipo: "-" }),
      ],
      errores: [
        { mal: "我不有钱。", bien: "我没有钱。", porque: "有 solo se niega con 没." },
        {
          mal: "我昨天不去学校。",
          bien: "我昨天没去学校。",
          porque: "Para decir que algo no ocurrió se usa 没.",
        },
        { mal: "我没是老师。", bien: "我不是老师。", porque: "是 siempre se niega con 不." },
      ],
      matices: [
        "不 sí aparece en pasado para hábitos: 以前我不吃肉, «antes no comía carne».",
        "不 se pronuncia bú antes de un 4.º tono: 不去 bú qù, 不是 bú shì.",
        "Delante de un verbo, 没 y 没有 significan lo mismo: 我没去 = 我没有去.",
      ],
      relacionados: [
        "tiempo-y-aspecto/el-verbo-no-cambia",
        "tiempo-y-aspecto/experiencia",
        "verbos-principales/ser-tener-estar",
      ],
    },
    {
      slug: "tambien-todos-solo",
      titulo: "也, 都 y 只: siempre antes del verbo",
      hanzi: "也 · 都 · 只",
      nivel: "HSK 1",
      resumen:
        "也 (también), 都 (todos) y 只 (solo) van después del sujeto y antes del verbo. Nunca al final, como el «también» del español.",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我们" },
        { rol: "adverbio", etiqueta: "也 / 都 / 只", ejemplo: "都" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "喜欢" },
        { rol: "objeto", etiqueta: "Objeto", ejemplo: "咖啡" },
      ],
      explicacion: [
        "En español «también» puede ir casi en cualquier parte: «yo también», «también yo», «me gusta también». En chino 也 (yě) va siempre justo antes del verbo o del adjetivo: 我也喜欢, «a mí también me gusta».",
        "都 (dōu) significa «todos» o «ambos», pero es un adverbio: no va junto al sustantivo sino antes del verbo, y abarca lo que está delante. 我们都去, «todos vamos» (literal: nosotros todos vamos).",
        "只 (zhǐ) es «solo»: 我只有一个, «solo tengo uno».",
        "Si van juntos, el orden es 也 + 都: 他们也都是学生, «ellos también son todos estudiantes». Con negación, el adverbio va antes del 不: 我也不去, «yo tampoco voy».",
      ],
      tabla: {
        columnas: ["Español", "Chino", "Ojo"],
        filas: [
          ["Yo también voy.", "我也去。", "也 antes del verbo"],
          ["Yo tampoco voy.", "我也不去。", "也 + 不"],
          ["Todos vamos.", "我们都去。", "都 después del grupo"],
          ["No vamos todos.", "我们不都去。", "不 + 都: algunos sí"],
          ["No va ninguno.", "我们都不去。", "都 + 不: ninguno"],
          ["Solo tengo uno.", "我只有一个。", "只 antes del verbo"],
        ],
      },
      ejemplos: [
        s([v.wo, v.ye, v.xihuan, v.kafei, "。"], "A mí también me gusta el café.", { tipo: "+" }),
        s([v.ta, v.shi, v.xuesheng, "，", v.wo, v.ye, v.shi, "。"], "Él es estudiante, yo también.", { tipo: "+",
          lit: "Él ser estudiante, yo también ser.",
          nota: "也 no puede cerrar la oración: hay que repetir el verbo (是).",
        }),
        s([v.women, v.dou, v.shi, v.xuesheng, "。"], "Todos somos estudiantes.", { tipo: "+" }),
        s([v.women, v.dou, v.bu, v.qu, "。"], "No va ninguno de nosotros.", { tipo: "-", lit: "Nosotros todos no ir." }),
        s([v.wo, zhiSolo, v.he, v.cha, "。"], "Solo tomo té.", { tipo: "+" }),
        s([v.wo, v.ye, v.bu, v.zhidao, "。"], "Yo tampoco sé.", { tipo: "-" }),
      ],
      errores: [
        { mal: "我喜欢咖啡也。", bien: "我也喜欢咖啡。", porque: "Calco de «me gusta el café también». 也 va antes del verbo." },
        { mal: "也我去。", bien: "我也去。", porque: "Calco de «también yo». 也 va después del sujeto." },
        { mal: "都我们去。", bien: "我们都去。", porque: "都 va después del grupo al que se refiere, justo antes del verbo." },
        {
          mal: "我也。",
          bien: "我也是。",
          porque: "也 no puede quedar solo: necesita un verbo detrás. Para «yo también», 我也是 o repite el verbo.",
        },
      ],
      matices: [
        "不都 y 都不 no significan lo mismo: 我们不都去 es «no vamos todos (algunos sí)» y 我们都不去, «no va ninguno».",
        "都 con una palabra de pregunta forma «todo» o «nadie»: 谁都知道, «todo el mundo lo sabe».",
      ],
      relacionados: ["adverbios/negacion", "estructura/orden-de-la-oracion"],
    },
    pendiente("de-tiempo", "Adverbios de tiempo", "已经 · 还 · 就 · 才"),
    pendiente("de-frecuencia", "Adverbios de frecuencia", "常常 · 总是 · 有时候"),
    pendiente("de-modo", "De modo: 地", "认真地学习"),
  ],
};
