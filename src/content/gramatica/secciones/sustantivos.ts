import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const henduo = w("很多", "hěn duō", ["muy", "mucho"], "muchos");
const nvpengyou = w("女朋友", "nǚ péng you", ["mujer", "amigo", "amigo"], "novia");
const laoshimen = w("老师们", "lǎo shī men", ["viejo, respetado", "maestro", "(plural)"], "profesores");

export const sustantivos: Seccion = {
  slug: "sustantivos",
  titulo: "Sustantivos",
  hanzi: "名词",
  resumen: "Sin artículo, sin plural y sin género. El sustantivo nunca cambia.",
  intro: [
    "En chino no existe nada de lo que en español es obligatorio en cada sustantivo: el/un, singular/plural, masculino/femenino. Lo que sí hay que aprender es cómo expresar esas ideas cuando hacen falta, y para eso están los clasificadores y los demostrativos.",
  ],
  temas: [
    {
      slug: "sin-articulo-plural-genero",
      titulo: "Sin artículo, sin plural, sin género",
      hanzi: "书 = libro, libros, el libro, un libro",
      nivel: "HSK 1",
      resumen:
        "书 puede ser «libro», «libros», «el libro» o «un libro». El sustantivo chino nunca cambia; lo aclaran el contexto y unas pocas palabras.",
      explicacion: [
        "En español cada sustantivo trae tres decisiones: artículo (el/un), número (libro/libros) y género (el/la, -o/-a). El chino no marca ninguna: 书 es siempre 书.",
        "¿Uno o varios? Si importa, se dice con número y clasificador (三本书, «tres libros») o con palabras de cantidad: 很多书 «muchos libros». Si no importa, no se dice: 我喜欢书, «me gustan los libros».",
        "¿«El» o «un»? Para presentar algo nuevo se usa 一 + clasificador: 我有一个朋友, «tengo un amigo». Para algo ya conocido, 这/那 o nada: 书在桌子上, «el libro está sobre la mesa».",
        "们 marca plural, pero solo con personas y no es obligatorio: 老师们 «profesores», sobre todo para dirigirse a un grupo. Con cosas nunca se usa: ✗书们. Y si ya hay un número, sobra: 三个老师, no ✗三个老师们.",
        "No hay género: 朋友 es amigo o amiga, y 老师, profesor o profesora. Si hace falta, se aclara con 男 (hombre) o 女 (mujer): 男朋友 «novio», 女朋友 «novia».",
      ],
      tabla: {
        columnas: ["Español", "Chino", "Qué marca la diferencia"],
        filas: [
          ["el libro", "书 / 这本书", "el contexto o 这"],
          ["un libro", "一本书", "一 + clasificador"],
          ["tres libros", "三本书", "número + clasificador"],
          ["muchos libros", "很多书", "很多"],
          ["me gustan los libros", "我喜欢书。", "nada: es en general"],
          ["amigo / amiga", "朋友", "nada"],
          ["novio / novia", "男朋友 / 女朋友", "男 / 女"],
        ],
      },
      ejemplos: [
        s([v.wo, v.xihuan, v.shu, "。"], "Me gustan los libros.", { nota: "En general: sin artículo y sin plural." }),
        s([v.wo, v.you, v.yi, v.ge, v.pengyou, "。"], "Tengo un amigo (o una amiga).", {
          lit: "Yo tener un (unidad) amigo.",
        }),
        s([v.ta, v.you, henduo, v.shu, "。"], "Él tiene muchos libros."),
        s([v.shu, v.zai, v.zhuozi, v.shang, "。"], "El libro está sobre la mesa.", { lit: "Libro estar mesa-sobre." }),
        s([v.taElla, v.shi, v.wo, v.de, nvpengyou, "。"], "Ella es mi novia.", { lit: "Ella ser yo 的 mujer-amigo." }),
        s([laoshimen, v.hao, "！"], "¡Hola, profesores!", { lit: "Profesores bien." }),
      ],
      errores: [
        { mal: "我有很多书们。", bien: "我有很多书。", porque: "们 nunca va con cosas." },
        { mal: "三个老师们", bien: "三个老师", porque: "Si ya hay un número, 们 sobra." },
        {
          mal: "我喜欢的书。",
          bien: "我喜欢书。",
          porque: "Calco de «me gustan los libros»: no hace falta nada que haga de «los». 我喜欢的书 significa «los libros que me gustan».",
        },
      ],
      matices: [
        "们 con personas es opcional y mucho menos frecuente que el plural en español. 我有三个朋友 nunca lleva 们, y 学生来了 puede ser «llegó el alumno» o «llegaron los alumnos».",
      ],
      relacionados: ["numeros-y-clasificadores/clasificadores", "pronombres/demostrativos", "particulas/de"],
    },
    pendiente("sufijos", "Sufijos que forman sustantivos", "子 · 家 · 员 · 者"),
    pendiente("palabras-de-tiempo", "Palabras de tiempo", "今天 · 现在 · 以前"),
  ],
};
