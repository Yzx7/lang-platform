import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const ba = w("把", "bǎ", ["agarrar"], "(把)");
const qing = w("请", "qǐng", ["por favor, invitar"], "por favor");
const men = w("门", "mén", ["puerta"]);
const guanshang = w("关上", "guān shang", ["cerrar", "arriba"], "cerrar");
const nazou = w("拿走", "ná zǒu", ["tomar", "irse"], "llevarse");
const zuoye = w("作业", "zuò yè", ["hacer", "tarea, oficio"], "tarea");
const zuowan = w("做完", "zuò wán", ["hacer", "terminar"], "terminar");
const bei = w("被", "bèi", ["sufrir, cubrir"], "(被)");
const tou = w("偷", "tōu", ["robar"]);
const xiaotou = w("小偷", "xiǎo tōu", ["pequeño", "robar"], "ladrón");
const piping = w("批评", "pī píng", ["criticar", "evaluar"], "regañar");
const dangao = w("蛋糕", "dàn gāo", ["huevo", "pastel"], "pastel");

export const pasivaYBa: Seccion = {
  slug: "pasiva-y-ba",
  titulo: "Pasiva y 把",
  hanzi: "被字句 · 把字句",
  resumen:
    "Dos estructuras que ponen al objeto antes del verbo: 被 para la pasiva y 把 para decir qué le pasó al objeto.",
  intro: [
    "La pasiva con 被 se parece a la del español, pero se usa mucho menos y casi siempre para algo malo.",
    "把 no tiene equivalente en español ni en inglés. Es de nivel HSK 3, pero aparece por todos lados: conviene entenderlo pronto aunque tardes en usarlo.",
  ],
  temas: [
    {
      slug: "ba",
      titulo: "把: el objeto antes del verbo",
      hanzi: "主语 + 把 + 宾语 + 动词 + 结果",
      nivel: "HSK 3",
      resumen:
        "把 toma el objeto y lo pone antes del verbo para decir qué le pasó: 我把书放在桌子上, «puse el libro sobre la mesa».",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我" },
        { rol: "particula", etiqueta: "把", ejemplo: "把" },
        { rol: "objeto", etiqueta: "Objeto", ejemplo: "书" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "放" },
        { rol: "complemento", etiqueta: "Resultado / lugar", ejemplo: "在桌子上" },
      ],
      explicacion: [
        "El orden normal es Sujeto + Verbo + Objeto. Con 把 (bǎ, «agarrar»), el objeto se adelanta: Sujeto + 把 + Objeto + Verbo + algo más. Literalmente: «yo agarro el libro y lo pongo sobre la mesa».",
        "Se usa cuando la acción le hace algo concreto al objeto: lo mueve, lo cambia, lo termina, lo pierde. Por eso el verbo nunca va solo: lleva un resultado, un lugar o 了. ✗我把书看 no dice nada; 我把书看完了 («terminé el libro») sí.",
        "El objeto es algo específico y conocido: 把这本书, 把我的手机.",
        "Es muy común con 放 («poner») y con lugares: 把…放在…",
      ],
      tabla: {
        columnas: ["Sin 把", "Con 把", "Español"],
        filas: [
          ["我喝了咖啡。", "我把咖啡喝了。", "Me tomé el café."],
          ["我看完了这本书。", "我把这本书看完了。", "Terminé de leer este libro."],
          ["—", "我把书放在桌子上。", "Puse el libro sobre la mesa."],
          ["—", "请把门关上。", "Por favor, cierra la puerta."],
        ],
      },
      ejemplos: [
        s([v.wo, ba, v.shu, v.fang, v.zai, v.zhuozi, v.shang, "。"], "Puse el libro sobre la mesa.", {
          lit: "Yo agarrar libro poner en mesa-sobre.",
        }),
        s([v.wo, ba, v.kafei, v.he, v.le, "。"], "Me tomé el café.", {
          nota: "Da a entender que ya no queda: el objeto «sufrió» la acción.",
        }),
        s([qing, ba, men, guanshang, "。"], "Por favor, cierra la puerta.", { lit: "Por favor agarrar puerta cerrar." }),
        s([v.ta, ba, v.wo, v.de, v.shouji, nazou, v.le, "。"], "Se llevó mi celular.", {
          lit: "Él agarrar yo 的 celular tomar-irse 了.",
        }),
        s([v.wo, ba, zuoye, zuowan, v.le, "。"], "Terminé la tarea."),
      ],
      errores: [
        { mal: "我把书看。", bien: "我把书看完了。", porque: "Con 把, el verbo nunca va solo: necesita un resultado, un lugar o 了." },
        {
          mal: "我把他喜欢。",
          bien: "我喜欢他。",
          porque: "把 no se usa con verbos que no le hacen nada al objeto (gustar, saber, conocer).",
        },
        { mal: "我把书没放在桌子上。", bien: "我没把书放在桌子上。", porque: "La negación va antes de 把." },
      ],
      matices: [
        "Cuando después del verbo va un lugar o un destino (放在, 放到, 送给), 把 es casi obligatorio: ✗我放书在桌子上 suena mal.",
        "Muchas oraciones con 把 también se pueden decir sin él. Entiéndelo desde ya, pero no te obsesiones con usarlo.",
      ],
      relacionados: ["pasiva-y-ba/bei", "complementos/resultado", "preposiciones/lugar"],
    },
    {
      slug: "bei",
      titulo: "La pasiva con 被",
      hanzi: "主语 + 被 + (quien hace) + 动词 + 结果",
      nivel: "HSK 3",
      resumen:
        "被 marca que el sujeto recibe la acción: 我的手机被偷了, «me robaron el celular». Se usa sobre todo para cosas que salieron mal.",
      formula: [
        { rol: "sujeto", etiqueta: "Quien recibe", ejemplo: "手机" },
        { rol: "particula", etiqueta: "被", ejemplo: "被" },
        { rol: "sujeto", etiqueta: "Quien hace (opcional)", ejemplo: "小偷" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "偷" },
        { rol: "particula", etiqueta: "了", ejemplo: "了" },
      ],
      explicacion: [
        "被 (bèi, «sufrir, cubrir») pone primero a quien recibe la acción: 我的手机被偷了, «mi celular fue robado».",
        "Quien hace la acción va justo después de 被, y se puede omitir: 我的手机被小偷偷了 («un ladrón me robó el celular») / 我的手机被偷了 («me robaron el celular»).",
        "Igual que con 把, el verbo no va solo: lleva 了 o un resultado.",
        "En español usamos mucho la pasiva neutra («el libro fue escrito en 1990»). En chino, 被 suele sonar a desgracia (robar, golpear, regañar, perder). Para lo neutro se usa la pasiva sin marca: 饭做好了, «la comida está hecha».",
      ],
      tabla: {
        columnas: ["Activa", "Pasiva con 被", "Español"],
        filas: [
          ["小偷偷了我的手机。", "我的手机被小偷偷了。", "Un ladrón me robó el celular."],
          ["老师批评了他。", "他被老师批评了。", "El profesor lo regañó."],
          ["他吃了我的蛋糕。", "我的蛋糕被他吃了。", "Se comió mi pastel."],
          ["—", "我的手机被偷了。", "Me robaron el celular (sin decir quién)."],
        ],
      },
      ejemplos: [
        s([v.wo, v.de, v.shouji, bei, tou, v.le, "。"], "Me robaron el celular.", { lit: "Yo 的 celular sufrir robar 了." }),
        s([v.wo, v.de, v.shouji, bei, xiaotou, tou, v.le, "。"], "Un ladrón me robó el celular.", {
          nota: "小偷 «ladrón» es literalmente «pequeño-robar».",
        }),
        s([v.ta, bei, v.laoshi, piping, v.le, "。"], "El profesor lo regañó.", { lit: "Él sufrir profesor criticar 了." }),
        s([v.wo, v.de, dangao, bei, v.ta, v.chi, v.le, "。"], "Él se comió mi pastel."),
        s([v.fan, v.zuohao, v.le, "。"], "La comida está lista.", { nota: "Pasiva sin 被: es lo normal cuando no hay desgracia." }),
      ],
      errores: [
        {
          mal: "这本书被他写了。",
          bien: "这本书是他写的。",
          porque: "Para algo neutro no se usa 被. «Este libro lo escribió él» se dice con 是…的.",
        },
        { mal: "我的手机被偷。", bien: "我的手机被偷了。", porque: "Con 被, el verbo no va solo." },
      ],
      matices: [
        "Al hablar también se usan 让 (ràng) y 叫 (jiào) en vez de 被: 我的手机让人偷了.",
        "Por influencia del inglés, en textos formales y traducciones 被 aparece cada vez más con sentido neutro, pero al hablar sigue siendo sobre todo negativo.",
      ],
      relacionados: ["pasiva-y-ba/ba", "complementos/resultado"],
    },
    pendiente("pasiva-sin-marca", "Pasiva sin marca", "饭做好了"),
  ],
};
