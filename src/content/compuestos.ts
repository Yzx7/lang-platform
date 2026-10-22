import { w } from "./crear";
import type { Palabra } from "./tipos";

export type TipoCompuesto = {
  id: string;
  nombre: string;
  logica: string;
  explicacion: string;
  palabras: Palabra[];
  subgrupos?: { titulo: string; palabras: Palabra[] }[];
};

export const tiposCompuesto: TipoCompuesto[] = [
  {
    id: "verbo-objeto",
    nombre: "Verbo + objeto",
    logica: "acción + sobre qué",
    explicacion:
      "El primer carácter es una acción y el segundo es aquello sobre lo que recae. Muchos verbos que en español son una sola palabra en chino llevan su objeto incluido.",
    palabras: [
      w("吃饭", "chī fàn", ["comer", "comida"], "comer"),
      w("看书", "kàn shū", ["mirar", "libro"], "leer"),
      w("洗澡", "xǐ zǎo", ["lavar", "baño"], "bañarse"),
      w("跳舞", "tiào wǔ", ["saltar", "danza"], "bailar"),
      w("唱歌", "chàng gē", ["cantar", "canción"], "cantar"),
      w("睡觉", "shuì jiào", ["dormir", "sueño"], "dormir"),
      w("见面", "jiàn miàn", ["ver", "cara"], "verse, encontrarse", { lit: "verse la cara" }),
    ],
  },
  {
    id: "verbo-resultado",
    nombre: "Verbo + resultado",
    logica: "acción → qué resultó",
    explicacion:
      "El primer carácter es la acción y el segundo, lo que pasó por ella. Para entender la palabra, pregúntate qué se hizo y cómo quedó.",
    palabras: [
      w("说明", "shuō míng", ["hablar", "claro"], "explicar", { lit: "hablar hasta que quede claro" }),
      w("提高", "tí gāo", ["levantar", "alto"], "mejorar, elevar", { lit: "levantar hasta que esté alto" }),
      w("打破", "dǎ pò", ["golpear", "roto"], "romper", { lit: "golpear hasta romper" }),
      w("推开", "tuī kāi", ["empujar", "abierto"], "abrir empujando"),
      w("听懂", "tīng dǒng", ["escuchar", "entender"], "entender (al oír)"),
    ],
  },
  {
    id: "modificador-nucleo",
    nombre: "Modificador + núcleo",
    logica: "el segundo es la categoría",
    explicacion:
      "Es el tipo más común. El último carácter dice qué clase de cosa es (máquina, vehículo, carne…) y el de adelante precisa cuál.",
    palabras: [
      w("飞机", "fēi jī", ["volar", "máquina"], "avión"),
      w("火车", "huǒ chē", ["fuego", "vehículo"], "tren"),
      w("牛肉", "niú ròu", ["vaca", "carne"], "carne de res"),
      w("牙医", "yá yī", ["diente", "médico"], "dentista"),
      w("中医", "zhōng yī", ["China", "medicina"], "medicina china"),
    ],
  },
  {
    id: "paralelo",
    nombre: "Paralelo",
    logica: "sinónimos u opuestos",
    explicacion:
      "Los dos caracteres pesan lo mismo. Si son sinónimos, el segundo evita confusiones entre homófonos; si son opuestos, juntos forman un concepto más amplio.",
    palabras: [],
    subgrupos: [
      {
        titulo: "Sinónimos",
        palabras: [
          w("朋友", "péng you", ["amigo", "amigo"], "amigo"),
          w("帮助", "bāng zhù", ["ayudar", "ayudar"], "ayudar"),
          w("道路", "dào lù", ["camino", "camino"], "camino"),
          w("学习", "xué xí", ["estudiar", "practicar"], "aprender"),
        ],
      },
      {
        titulo: "Opuestos",
        palabras: [
          w("大小", "dà xiǎo", ["grande", "pequeño"], "tamaño"),
          w("左右", "zuǒ yòu", ["izquierda", "derecha"], "aproximadamente"),
          w("多少", "duō shao", ["mucho", "poco"], "¿cuánto?"),
          w("开关", "kāi guān", ["abrir", "cerrar"], "interruptor"),
          w("买卖", "mǎi mai", ["comprar", "vender"], "negocio"),
          w("矛盾", "máo dùn", ["lanza", "escudo"], "contradicción", {
            nota: "Un mercader decía que su lanza atravesaba todo y que su escudo resistía todo. Alguien preguntó: ¿y si tu lanza golpea tu escudo?",
          }),
        ],
      },
      {
        titulo: "Con la conexión perdida",
        palabras: [
          w("窗户", "chuāng hu", ["ventana", "puerta"], "ventana", {
            nota: "Con el tiempo se perdió el sentido de «puerta»; quedó solo «ventana».",
          }),
        ],
      },
    ],
  },
  {
    id: "duplicados",
    nombre: "Duplicados",
    logica: "el mismo carácter dos veces",
    explicacion:
      "Aparecen con la familia, para expresar cariño o informalidad, o con el sentido de «cada».",
    palabras: [
      w("妈妈", "mā ma", ["mamá", "mamá"], "mamá"),
      w("看看", "kàn kan", ["mirar", "mirar"], "echar un vistazo"),
      w("天天", "tiān tiān", ["día", "día"], "todos los días"),
      w("人人", "rén rén", ["persona", "persona"], "todo el mundo"),
    ],
  },
  {
    id: "afijos",
    nombre: "Con afijos",
    logica: "prefijo o sufijo + raíz",
    explicacion:
      "Hay pocos prefijos y sufijos, pero son muy frecuentes. A veces pierden su significado original, como 老 en 老师.",
    palabras: [
      w("老师", "lǎo shī", ["(prefijo)", "maestro"], "profesor", {
        nota: "Aquí 老 no significa «viejo»: es un prefijo de respeto o cercanía.",
      }),
      w("第一", "dì yī", ["(ordinal)", "uno"], "primero"),
      w("科学家", "kē xué jiā", ["rama", "estudio", "experto"], "científico"),
      w("作家", "zuò jiā", ["obra", "experto"], "escritor"),
      w("桌子", "zhuō zi", ["mesa", "(sufijo)"], "mesa"),
    ],
  },
  {
    id: "sujeto-predicado",
    nombre: "Sujeto + predicado",
    logica: "una mini-oración",
    explicacion:
      "El primer carácter es el sujeto y el segundo dice qué le pasa o cómo es. La palabra es una oración comprimida.",
    palabras: [
      w("地震", "dì zhèn", ["tierra", "temblar"], "terremoto", { lit: "la tierra tiembla" }),
      w("民主", "mín zhǔ", ["pueblo", "gobernar"], "democracia", { lit: "el pueblo gobierna" }),
      w("年轻", "nián qīng", ["años", "ligero"], "joven", { lit: "los años pesan poco" }),
      w("头疼", "tóu téng", ["cabeza", "doler"], "dolor de cabeza", { lit: "la cabeza duele" }),
      w("口臭", "kǒu chòu", ["boca", "apestar"], "mal aliento", { lit: "la boca apesta" }),
    ],
  },
];

export const masEjemplos: { titulo: string; palabras: Palabra[] }[] = [
  {
    titulo: "Animales",
    palabras: [
      w("猫头鹰", "māo tóu yīng", ["gato", "cabeza", "águila"], "búho"),
      w("长颈鹿", "cháng jǐng lù", ["largo", "cuello", "ciervo"], "jirafa"),
      w("河马", "hé mǎ", ["río", "caballo"], "hipopótamo"),
      w("熊猫", "xióng māo", ["oso", "gato"], "panda"),
    ],
  },
  {
    titulo: "Ciencia y cuerpo",
    palabras: [
      w("火山", "huǒ shān", ["fuego", "montaña"], "volcán"),
      w("地球", "dì qiú", ["tierra", "bola"], "la Tierra"),
      w("恐龙", "kǒng lóng", ["terror", "dragón"], "dinosaurio"),
      w("银河", "yín hé", ["plata", "río"], "Vía Láctea"),
      w("显微镜", "xiǎn wēi jìng", ["revelar", "diminuto", "lente"], "microscopio"),
      w("望远镜", "wàng yuǎn jìng", ["mirar", "lejos", "lente"], "telescopio"),
      w("发烧", "fā shāo", ["emitir", "quemar"], "tener fiebre"),
    ],
  },
];

/** Préstamos: aquí los caracteres solo aportan el sonido. */
export const excepcionesFoneticas: Palabra[] = [
  w("沙发", "shā fā", ["arena", "emitir"], "sofá"),
  w("咖啡", "kā fēi", ["(sonido)", "(sonido)"], "café"),
  w("逻辑", "luó ji", ["patrullar", "recopilar"], "lógica"),
  w("葡萄", "pú tao", ["(solo en esta palabra)", "(solo en esta palabra)"], "uva"),
  w("蝴蝶", "hú dié", ["(solo en esta palabra)", "(solo en esta palabra)"], "mariposa"),
];

/** Marcas: suenan parecido al original y además significan algo bueno. */
export const marcas: Palabra[] = [
  w("可口可乐", "kě kǒu kě lè", ["agradable", "boca", "da", "alegría"], "Coca-Cola", { lit: "sabroso y alegre" }),
  w("宝马", "bǎo mǎ", ["tesoro", "caballo"], "BMW", { lit: "caballo precioso" }),
  w("耐克", "nài kè", ["aguantar", "vencer"], "Nike"),
  w("奔驰", "bēn chí", ["correr", "galopar"], "Mercedes-Benz"),
];
