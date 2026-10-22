import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const a = w("啊", "a", ["(emoción)"]);

export const particulas: Seccion = {
  slug: "particulas",
  titulo: "Partículas",
  hanzi: "助词",
  resumen: "Palabras sin significado propio que dan estructura (的) o actitud (吧, 呢, 啊).",
  intro: [
    "Las partículas son una clase de palabra que el español no tiene como tal. Unas arman la oración (的 une el modificador con el sustantivo) y otras, al final, transmiten la actitud que en español daría la entonación.",
    "Las partículas de aspecto (了, 过, 着) están en Tiempo y aspecto.",
  ],
  temas: [
    {
      slug: "de",
      titulo: "的: el «de» al revés",
      hanzi: "A 的 B",
      nivel: "HSK 1",
      resumen:
        "的 une un modificador con un sustantivo. El orden es al revés que en español: primero el dueño o la descripción, después la cosa.",
      formula: [
        { rol: "modificador", etiqueta: "Dueño / descripción", ejemplo: "我朋友" },
        { rol: "particula", etiqueta: "的", ejemplo: "的" },
        { rol: "objeto", etiqueta: "Cosa", ejemplo: "书" },
      ],
      explicacion: [
        "En español decimos «el libro de mi amigo»: primero la cosa y luego el dueño. En chino es al revés: 我朋友的书, «mi amigo 的 libro». Se parece al inglés «my friend's book».",
        "Lo mismo vale para las descripciones: todo lo que describe a un sustantivo va antes, con 的. 很贵的咖啡, «un café muy caro» (literal: muy caro 的 café).",
        "Así se hacen también las frases con «que»: 我买的书, «el libro que compré» (literal: yo comprar 的 libro). El chino no tiene pronombres relativos; 的 hace ese trabajo.",
        "Si ya se sabe de qué hablamos, la cosa se omite: 这是我的, «esto es mío».",
      ],
      tabla: {
        columnas: ["Español", "Chino", "Literal"],
        filas: [
          ["mi libro", "我的书", "yo 的 libro"],
          ["el libro de mi amigo", "我朋友的书", "yo amigo 的 libro"],
          ["mi mamá", "我妈妈", "yo mamá (sin 的)"],
          ["un café muy caro", "很贵的咖啡", "muy caro 的 café"],
          ["el libro que compré", "我买的书", "yo comprar 的 libro"],
          ["es mío", "是我的", "ser yo 的"],
        ],
      },
      ejemplos: [
        s([v.zhe, v.shi, v.wo, v.de, v.shu, "。"], "Este es mi libro.", { lit: "Esto ser yo 的 libro." }),
        s([v.zhe, v.shi, v.wo, v.pengyou, v.de, v.shu, "。"], "Este es el libro de mi amigo.", {
          lit: "Esto ser yo amigo 的 libro.",
        }),
        s([v.wo, v.mama, v.shi, v.laoshi, "。"], "Mi mamá es profesora.", { nota: "Sin 的: con la familia es lo normal." }),
        s([v.wo, v.bu, v.xihuan, v.hen, v.gui, v.de, v.kafei, "。"], "No me gusta el café muy caro."),
        s([v.zhe, v.shi, v.wo, v.mai, v.de, v.shu, "。"], "Este es el libro que compré.", {
          lit: "Esto ser yo comprar 的 libro.",
        }),
        s([v.zhe, v.ben, v.shu, v.shi, v.ta, v.de, "。"], "Este libro es de él.", { nota: "Al final, 的 reemplaza a la cosa: «suyo»." }),
      ],
      errores: [
        { mal: "书的我", bien: "我的书", porque: "Calco de «libro de mí». El dueño va primero." },
        {
          mal: "书的朋友",
          bien: "朋友的书",
          porque: "«El libro del amigo» se arma al revés: dueño + 的 + cosa. 书的朋友 sería «el amigo del libro».",
        },
        {
          mal: "我买书的",
          bien: "我买的书",
          porque: "Para «el libro que compré», la cosa va al final, después de 的.",
        },
      ],
      matices: [
        "的, 得 y 地 se pronuncian igual (de) y son tres cosas distintas: 的 va antes de un sustantivo y 得, después de un verbo (ver «Cómo se hace algo: verbo + 得»).",
        "Con adjetivos de una sílaba, a veces no se usa 的: 好人 «buena persona», 小猫 «gatito». Con frases más largas siempre va.",
      ],
      relacionados: ["pronombres/personales", "complementos/grado", "sustantivos/sin-articulo-plural-genero"],
    },
    {
      slug: "tono",
      titulo: "Partículas de tono: 吧, 呢, 啊",
      hanzi: "吧 · 呢 · 啊",
      nivel: "HSK 1–2",
      resumen:
        "Van al final de la oración y no cambian el significado, sino la actitud: sugerir, suponer, devolver la pregunta, sonar más amable.",
      formula: [
        { rol: "sujeto", etiqueta: "Sujeto", ejemplo: "我们" },
        { rol: "verbo", etiqueta: "Verbo", ejemplo: "走" },
        { rol: "particula", etiqueta: "吧 / 呢 / 啊", ejemplo: "吧" },
      ],
      explicacion: [
        "El español transmite la actitud con la entonación y con muletillas: «¿no?», «¿y tú?», «anda», «pues». El chino no puede jugar tanto con la entonación porque los tonos ya están ocupados, así que usa partículas al final.",
        "吧 (ba) suaviza: convierte una orden en sugerencia (我们走吧, «vámonos») y una afirmación en suposición (你是学生吧？, «eres estudiante, ¿no?»).",
        "呢 (ne) devuelve la pregunta (我很好，你呢？, «estoy bien, ¿y tú?») y pregunta por algo que no aparece (我的手机呢？, «¿y mi celular?»).",
        "啊 (a) da emoción o calidez: 好啊！, «¡dale!». Su sonido se mezcla con la vocal anterior y a veces se escribe 呀 (ya).",
      ],
      tabla: {
        columnas: ["Partícula", "Uso", "Ejemplo", "Español"],
        filas: [
          ["吧 ba", "sugerir", "我们走吧。", "Vámonos."],
          ["吧 ba", "suponer", "你是学生吧？", "Eres estudiante, ¿no?"],
          ["呢 ne", "devolver la pregunta", "你呢？", "¿Y tú?"],
          ["呢 ne", "¿dónde está…?", "我的手机呢？", "¿Y mi celular?"],
          ["啊 a", "entusiasmo", "好啊！", "¡Dale!"],
        ],
      },
      ejemplos: [
        s([v.women, v.zou, v.ba, "。"], "Vámonos.", { lit: "Nosotros irse 吧." }),
        s([v.ni, v.shi, v.xuesheng, v.ba, "？"], "Eres estudiante, ¿no?"),
        s([v.wo, v.hen, v.hao, "，", v.ni, v.ne, "？"], "Estoy bien, ¿y tú?"),
        s([v.wo, v.de, v.shouji, v.ne, "？"], "¿Dónde está mi celular?", { lit: "Yo 的 celular 呢?" }),
        s([v.hao, a, "！"], "¡Dale!"),
      ],
      errores: [
        { mal: "你是学生吧吗？", bien: "你是学生吧？", porque: "Una sola partícula al final: 吧 ya hace la pregunta." },
        { mal: "我很好，你吗？", bien: "我很好，你呢？", porque: "Para devolver la pregunta se usa 呢, no 吗." },
      ],
      matices: [
        "Con 吧 (你是学生吧？) esperas un sí; con 吗 (你是学生吗？) la pregunta es neutra.",
        "Usar 啊 o 呀 todo el tiempo puede sonar infantil o muy cariñoso. Observa cómo lo usan los nativos en videos.",
      ],
      relacionados: ["preguntas/si-o-no", "particulas/de"],
    },
    pendiente("de-de-de", "Las tres «de»: 的, 得, 地", "的 · 得 · 地"),
  ],
};
