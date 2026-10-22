import { s, w } from "../../crear";
import { pendiente, type Seccion } from "../tipos";
import { v } from "../vocab";

const chuang = w("床", "chuáng", ["cama"]);
const xia = w("下", "xià", ["abajo"], "debajo");
const pangbian = w("旁边", "páng biān", ["lado", "borde"], "al lado");

export const preposiciones: Seccion = {
  slug: "preposiciones",
  titulo: "Preposiciones",
  hanzi: "介词",
  resumen:
    "Van antes del verbo, no al final. Y para «sobre», «dentro» o «debajo», la posición va después del sustantivo.",
  intro: [
    "Las preposiciones chinas vienen de verbos (在 «estar en», 给 «dar», 跟 «seguir») y por eso se comportan como el primer verbo de una cadena: van antes del verbo principal, junto con su sustantivo.",
    "Las ideas de «sobre», «dentro» o «delante» no son preposiciones sino palabras de posición que van detrás: 桌子上, «mesa-sobre».",
  ],
  temas: [
    {
      slug: "lugar",
      titulo: "Dónde está algo: 在 + lugar + posición",
      hanzi: "在 + 名词 + 上 / 里 / 下",
      nivel: "HSK 1",
      resumen:
        "Para «sobre la mesa» o «dentro de la mochila», el chino dice «mesa-sobre», «mochila-dentro»: primero el sustantivo y después la posición.",
      formula: [
        { rol: "sujeto", etiqueta: "Cosa", ejemplo: "书" },
        { rol: "verbo", etiqueta: "在", ejemplo: "在" },
        { rol: "lugar", etiqueta: "Referencia", ejemplo: "桌子" },
        { rol: "particula", etiqueta: "Posición", ejemplo: "上" },
      ],
      explicacion: [
        "En español la preposición va antes: «sobre la mesa», «en la mochila», «debajo de la cama». En chino la posición va después del sustantivo, como un sufijo: 桌子上 (mesa-sobre), 包里 (mochila-dentro), 床下 (cama-debajo).",
        "在 marca que hablamos de un lugar y la palabra de posición lo precisa: 在桌子上, «sobre la mesa».",
        "Con lo que ya es un lugar (países, ciudades, 家, 学校) no hace falta la posición: 在中国, 在北京, 在家. Con objetos sí: ✗在桌子 → 在桌子上.",
        "Las posiciones vienen en pares de opuestos: 上/下 (arriba/abajo), 里/外 (dentro/fuera), 前/后 (delante/detrás). Con 边 o 面 forman palabras completas: 上边, 外面, 后边.",
      ],
      tabla: {
        columnas: ["Posición", "Idea", "Ejemplo", "Español"],
        filas: [
          ["上 shàng", "sobre, arriba", "桌子上", "sobre la mesa"],
          ["下 xià", "debajo", "床下", "debajo de la cama"],
          ["里 lǐ", "dentro", "包里", "dentro de la mochila"],
          ["外 wài", "fuera", "门外", "fuera de la puerta"],
          ["前面 qiánmiàn", "delante", "学校前面", "frente a la escuela"],
          ["后面 hòumiàn", "detrás", "房子后面", "detrás de la casa"],
          ["旁边 pángbiān", "al lado", "我旁边", "a mi lado"],
        ],
      },
      ejemplos: [
        s([v.shu, v.zai, v.zhuozi, v.shang, "。"], "El libro está sobre la mesa.", { lit: "Libro estar mesa-sobre." }),
        s([v.shouji, v.zai, v.bao, v.li, "。"], "El celular está en la mochila.", { lit: "Celular estar mochila-dentro." }),
        s([v.mao, v.zai, chuang, xia, "。"], "El gato está debajo de la cama."),
        s([v.ta, v.zai, v.wo, pangbian, "。"], "Él está a mi lado.", { lit: "Él estar yo lado." }),
        s([v.wo, v.zai, v.jia, v.li, v.kan, v.shu, "。"], "Leo en casa.", { nota: "家 ya es un lugar: aquí 里 es opcional." }),
        s([v.wo, v.zai, v.zhongguo, v.xue, v.zhongwen, "。"], "Estudio chino en China."),
      ],
      errores: [
        { mal: "书在上桌子。", bien: "书在桌子上。", porque: "Calco de «sobre la mesa». La posición va después." },
        {
          mal: "我的手机在包。",
          bien: "我的手机在包里。",
          porque: "Un objeto no es un lugar: necesita la palabra de posición (里).",
        },
        { mal: "我在中国里。", bien: "我在中国。", porque: "Los países y las ciudades ya son lugares: no llevan 里." },
      ],
      matices: [
        "上 va más allá de «encima»: también es el «en» de superficies y medios. 墙上 «en la pared», 网上 «en internet», 车上 «en el carro».",
        "里 se usa con espacios cerrados y también con textos o grupos: 书里, «en el libro».",
      ],
      relacionados: ["verbos-principales/ser-tener-estar", "estructura/orden-de-la-oracion"],
    },
    pendiente("desde-hasta", "Desde y hasta: 从…到", "从 · 到"),
    pendiente("distancia", "Distancia: 离", "离"),
    pendiente("para-con-hacia", "Para, con, hacia: 给, 跟, 对", "给 · 跟 · 对"),
    pendiente("direccion", "Dirección: 往", "往"),
  ],
};
