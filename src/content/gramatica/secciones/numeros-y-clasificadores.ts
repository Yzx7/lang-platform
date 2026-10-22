import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const bei = w("杯", "bēi", ["taza, vaso"], "(clasif. bebidas)");
const zhi = w("只", "zhī", ["(animal)"], "(clasif. animales)");
const jian = w("件", "jiàn", ["pieza"], "(clasif. ropa)");
const yifu = w("衣服", "yī fu", ["ropa", "vestimenta"], "ropa");

export const numerosYClasificadores: Seccion = {
  slug: "numeros-y-clasificadores",
  titulo: "Números y clasificadores",
  hanzi: "数词 · 量词",
  resumen: "Para contar, entre el número y el sustantivo siempre va un clasificador: 一本书, 三杯咖啡.",
  intro: [
    "Los clasificadores son una clase de palabra que el español casi no tiene; lo más parecido es «una taza de café» o «una hoja de papel». En chino son obligatorios con todo lo que cuentas o señalas.",
  ],
  temas: [
    {
      slug: "clasificadores",
      titulo: "Los clasificadores",
      hanzi: "数词 + 量词 + 名词",
      nivel: "HSK 1",
      resumen:
        "Entre el número y el sustantivo siempre va una palabra que indica la «forma» de la cosa: 一本书, 三杯咖啡. Lo mismo con 这 y 那.",
      formula: [
        { rol: "modificador", etiqueta: "Número / 这 / 那", ejemplo: "三" },
        { rol: "particula", etiqueta: "Clasificador", ejemplo: "本" },
        { rol: "objeto", etiqueta: "Sustantivo", ejemplo: "书" },
      ],
      explicacion: [
        "En español a veces hacemos algo parecido: «una taza de café», «una hoja de papel», «una cabeza de ganado». En chino es obligatorio con todo lo que se cuenta.",
        "El clasificador suele decir algo de la forma: 本 (běn, «raíz, volumen») para libros, 张 (zhāng, «extender») para cosas planas como papel, mesas o boletos, 只 (zhī) para muchos animales, 杯 (bēi, «taza») para bebidas.",
        "个 (gè) es el comodín: sirve para personas y para muchas cosas. Si no sabes cuál usar, con 个 casi siempre te entienden.",
        "Con 这 («este») y 那 («ese») también va el clasificador: 这本书 «este libro», 那个人 «esa persona».",
        "Para «dos» antes de un clasificador se usa 两 (liǎng), no 二: 两个人.",
      ],
      tabla: {
        columnas: ["Clasificador", "Idea", "Se usa con", "Ejemplo"],
        filas: [
          ["个 gè", "unidad (genérico)", "personas, casi todo", "一个人"],
          ["本 běn", "volumen", "libros, cuadernos", "两本书"],
          ["杯 bēi", "taza, vaso", "bebidas", "三杯咖啡"],
          ["张 zhāng", "superficie plana", "papel, mesas, fotos", "一张纸"],
          ["只 zhī", "animal", "gatos, perros, pájaros", "一只猫"],
          ["件 jiàn", "pieza", "ropa de arriba, asuntos", "一件衣服"],
        ],
      },
      ejemplos: [
        s([v.wo, v.you, v.yi, v.ben, v.shu, "。"], "Tengo un libro.", { lit: "Yo tener un volumen libro." }),
        s([v.wo, v.yao, v.san, bei, v.kafei, "。"], "Quiero tres cafés.", { lit: "Yo querer tres taza café." }),
        s([v.ta, v.you, v.liang, zhi, v.mao, "。"], "Él tiene dos gatos.", { nota: "两, no 二, antes de un clasificador." }),
        s([v.zhe, v.ge, v.ren, v.shi, v.wo, v.pengyou, "。"], "Esta persona es mi amigo."),
        s([v.na, v.ben, v.shu, v.hen, v.gui, "。"], "Ese libro es caro."),
        s([v.wo, v.xiang, v.mai, v.yi, jian, yifu, "。"], "Quiero comprar una prenda de ropa."),
      ],
      errores: [
        { mal: "我有一书。", bien: "我有一本书。", porque: "Entre el número y el sustantivo siempre va un clasificador." },
        { mal: "二个人", bien: "两个人", porque: "Antes de un clasificador, «dos» es 两." },
        {
          mal: "我要三咖啡。",
          bien: "我要三杯咖啡。",
          porque: "Las bebidas se cuentan por taza o vaso, igual que «tres tazas de café».",
        },
      ],
      matices: [
        "一 cambia de tono según lo que sigue: yí antes de un 4.º tono (一个 yí ge, 一件 yí jiàn) y yì antes de los demás (一本 yì běn, 一杯 yì bēi). Aquí se escribe el tono de diccionario (yī).",
        "En el habla, 个 suele perder el tono: yí ge, zhè ge.",
        "Usar 个 con todo hace que te entiendan, pero suena a principiante. Aprende cada sustantivo con su clasificador: no «libro», sino 一本书.",
      ],
      relacionados: ["pronombres/demostrativos", "sustantivos/sin-articulo-plural-genero"],
    },
    pendiente("numeros", "Números del 0 al 10 000", "一 … 万"),
    pendiente("ordinales", "Ordinales", "第一 · 第二"),
    pendiente("fechas-y-horas", "Fechas y horas", "年 · 月 · 日 · 点"),
  ],
};
