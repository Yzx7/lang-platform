import { s } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

export const estructura: Seccion = {
  slug: "estructura",
  titulo: "Estructura de la oración",
  hanzi: "句子结构",
  resumen:
    "En chino, la gramática es el orden de las palabras. No hay conjugaciones ni terminaciones: la posición dice quién hace qué, cuándo y dónde.",
  intro: [
    "En español podemos mover las palabras con bastante libertad, porque las terminaciones del verbo ya dicen quién hace la acción y cuándo. El chino no tiene terminaciones, así que el orden hace ese trabajo.",
    "Esta sección no existía en un curso de inglés, porque el orden del inglés se parece al del español. En chino es lo primero que hay que tener claro.",
  ],
  temas: [
    {
      slug: "orden-de-la-oracion",
      titulo: "El orden de la oración",
      hanzi: "主语 + 时间 + 地点 + 动词 + 宾语",
      nivel: "HSK 1",
      resumen:
        "Primero armas el escenario (quién, cuándo, dónde) y después va la acción. El tiempo y el lugar siempre van antes del verbo.",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我" },
        { rol: "tiempo", etiqueta: "Tiempo", ejemplo: "昨天" },
        { rol: "lugar", etiqueta: "Lugar", ejemplo: "在家" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "看" },
        { rol: "objeto", etiqueta: "Objeto", ejemplo: "书" },
      ],
      explicacion: [
        "En español puedes mover el tiempo y el lugar casi a cualquier parte: «ayer leí en casa», «leí en casa ayer». En chino no: el escenario se arma antes de la acción, como un director que dice «luces, cámara… ¡acción!».",
        "El tiempo puede ir antes o después del sujeto (我昨天… o 昨天我…), pero siempre antes del verbo. El lugar va con 在 («en») y también antes del verbo.",
        "Si piensas en español y traduces palabra por palabra, el lugar te va a quedar al final. Esa es la trampa que este patrón evita.",
      ],
      tabla: {
        columnas: ["Sujeto", "Tiempo", "Lugar", "Verbo", "Objeto"],
        filas: [
          ["我", "昨天", "在家", "看", "书"],
          ["他", "明天", "在学校", "吃", "饭"],
          ["我们", "晚上", "在饭馆", "见", "面"],
        ],
      },
      ejemplos: [
        s([v.wo, v.zuotian, v.zai, v.jia, v.kan, v.shu, "。"], "Ayer leí en casa.", {
          lit: "Yo · ayer · en casa · leer · libro.",
        }),
        s([v.zuotian, v.wo, v.zai, v.jia, v.kan, v.shu, "。"], "Ayer leí en casa.", {
          nota: "También es correcto: el tiempo puede ir antes del sujeto.",
        }),
        s([v.ta, v.mingtian, v.zai, v.xuexiao, v.chifan, "。"], "Mañana él come en la escuela.", {
          lit: "Él · mañana · en escuela · comer.",
        }),
        s([v.women, v.wanshang, v.zai, v.fanguan, v.jianmian, "。"], "En la noche nos vemos en el restaurante.", {
          lit: "Nosotros · noche · en restaurante · vernos la cara.",
        }),
      ],
      errores: [
        { mal: "我看书在家。", bien: "我在家看书。", porque: "Calco del español «leo en casa». El lugar va antes del verbo." },
        { mal: "我看书昨天。", bien: "我昨天看书。", porque: "El tiempo nunca va al final; va antes del verbo." },
      ],
      relacionados: ["estructura/cadena-de-verbos", "preposiciones/lugar", "tiempo-y-aspecto/el-verbo-no-cambia"],
    },
    {
      slug: "cadena-de-verbos",
      titulo: "La cadena de acciones",
      hanzi: "连动句",
      nivel: "HSK 1–2",
      resumen:
        "Para unir varias acciones, el chino las pone en el orden en que ocurren. No necesita «para», «en» ni «con».",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我" },
        { rol: "verbo", etiqueta: "Acción 1 + objeto", ejemplo: "坐飞机" },
        { rol: "verbo", etiqueta: "Acción 2 + objeto", ejemplo: "去中国" },
      ],
      explicacion: [
        "En español conectamos acciones con preposiciones: «voy a China en avión», «como con palillos», «vuelvo a casa para dormir». Esas palabras no tienen un equivalente directo en chino, y buscarlas es lo que hace que muchas oraciones queden forzadas.",
        "El chino narra la realidad en orden: primero subes al avión y después llegas a China, así que dice 坐飞机去中国 («ir-en avión, ir China»). Primero tomas los palillos y después comes: 用筷子吃饭.",
        "Puedes encadenar tres, cuatro o más acciones. Mientras sigan el orden real, la oración se entiende.",
        "Si inviertes el orden, cambias el significado: 去中国坐飞机 sería «ir a China a tomar un avión (allá)».",
      ],
      ejemplos: [
        s([v.wo, v.hui, v.jia, v.shuijiao, "。"], "Vuelvo a casa a dormir.", { lit: "Yo · volver casa · dormir." }),
        s([v.wo, v.zuo, v.feiji, v.qu, v.zhongguo, "。"], "Voy a China en avión.", { lit: "Yo · ir-en avión · ir China." }),
        s([v.wo, v.yong, v.kuaizi, v.chifan, "。"], "Como con palillos.", { lit: "Yo · usar palillos · comer." }),
        s(
          [v.wo, v.zuo, v.feiji, v.qu, v.zhongguo, v.kan, v.pengyou, v.tiaowu, "。"],
          "Voy en avión a China a ver bailar a mi amigo.",
          { lit: "Yo · ir-en avión · ir China · ver amigo · bailar." },
        ),
      ],
      errores: [
        { mal: "我睡觉回家。", bien: "我回家睡觉。", porque: "El orden importa: así diría «duermo y después vuelvo a casa»." },
        {
          mal: "我去中国坐飞机。",
          bien: "我坐飞机去中国。",
          porque: "El orden invertido significa otra cosa: «voy a China a tomar un avión».",
        },
      ],
      relacionados: ["estructura/orden-de-la-oracion", "conectores/porque-asi-que-pero"],
    },
    pendiente("tema-y-comentario", "Tema y comentario", "这本书我看过"),
    pendiente("oraciones-sin-sujeto", "Oraciones sin sujeto", "下雨了"),
    pendiente("doble-objeto", "Dos objetos", "给你一本书"),
  ],
};
