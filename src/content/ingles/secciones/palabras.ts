import { pendiente, type Seccion } from "../tipos";

export const pronombres: Seccion = {
  slug: "pronombres",
  titulo: "Pronombres",
  ingles: "Pronouns",
  resumen:
    "Palabras que señalan o reemplazan a otras ya nombradas. En inglés cambian según su función: personales, objeto, posesivos, reflexivos…",
  temas: [
    {
      slug: "personales-y-posesivos",
      titulo: "Las 5 formas de cada pronombre",
      resumen:
        "Cada persona tiene 5 formas según su función: sujeto (I), objeto (me), posesivo adjetivo (my), posesivo pronombre (mine) y reflexivo (myself).",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Personal\n(sujeto)", "Objeto", "Posesivo adjetivo\n(+ sustantivo)", "Posesivo pronombre\n(solo)", "Reflexivo"],
          filas: [
            ["**I** // yo", "**me** // me, mí", "**my** // mi", "**mine** // mío", "**myself** // yo mismo"],
            ["**you** // tú", "**you** // te, ti", "**your** // tu", "**yours** // tuyo", "**yourself** // tú mismo"],
            ["**he** // él", "**him** // lo, le", "**his** // su (de él)", "**his** // suyo", "**himself** // él mismo"],
            ["**she** // ella", "**her** // la, le", "**her** // su (de ella)", "**hers** // suya", "**herself** // ella misma"],
            ["**it** // eso", "**it** // lo", "**its** // su (de eso)", "— // casi no se usa", "**itself** // sí mismo"],
            ["**we** // nosotros", "**us** // nos", "**our** // nuestro", "**ours** // nuestro", "**ourselves** // nosotros mismos"],
            ["**you** // ustedes", "**you** // les", "**your** // su (de ustedes)", "**yours** // suyo", "**yourselves** // ustedes mismos"],
            ["**they** // ellos", "**them** // los, les", "**their** // su (de ellos)", "**theirs** // suyo", "**themselves** // ellos mismos"],
          ],
        },
        {
          tipo: "ejemplos",
          titulo: "La misma idea en las 5 columnas",
          items: [
            { en: "**I** have a car.", es: "Yo tengo un carro.", nota: "Personal: hace la acción." },
            { en: "The car is for **me**.", es: "El carro es para mí.", nota: "Objeto: recibe la acción o va después de una preposición." },
            { en: "It's **my** car.", es: "Es mi carro.", nota: "Posesivo adjetivo: siempre va con un sustantivo." },
            { en: "The car is **mine**.", es: "El carro es mío.", nota: "Posesivo pronombre: va solo, reemplaza al sustantivo." },
            { en: "I bought it **myself**.", es: "Lo compré yo mismo.", nota: "Reflexivo: «yo mismo»." },
          ],
        },
        {
          tipo: "nota",
          titulo: "⚠️ Para no aprenderlo como robot",
          items: [
            "Its (sin apóstrofo) es posesivo: the dog wags **its** tail. It's (con apóstrofo) es it is: **it's** late.",
            "His sirve para las dos columnas de posesivo: it's **his** car / the car is **his**.",
          ],
        },
      ],
    },
    pendiente("indefinidos", "Pronombres indefinidos (anyone, nobody, everybody)"),
    pendiente("relativos", "Pronombres relativos (who, which, that)"),
    pendiente("reciprocos", "Pronombres recíprocos (each other)"),
  ],
};

export const sustantivos: Seccion = {
  slug: "sustantivos",
  titulo: "Sustantivos",
  ingles: "Nouns",
  resumen: "Los artículos (the, a, an), el plural y los contables e incontables.",
  temas: [
    {
      slug: "articulos",
      titulo: "Los artículos: the, a, an",
      resumen: "The es «el, la, los, las»; a y an son «un, una». La elección entre a y an depende del sonido de la palabra siguiente, no de la letra.",
      bloques: [
        {
          tipo: "vocab",
          titulo: "the (di / de) // el, la, lo, los, las",
          items: [
            { en: "the apple", pron: "di ápol", es: "la manzana" },
            { en: "the apples", pron: "di ápols", es: "las manzanas" },
            { en: "the car", pron: "de car", es: "el carro" },
            { en: "the buses", pron: "de báses", es: "los buses" },
          ],
        },
        {
          tipo: "texto",
          parrafos: [
            "The se pronuncia **di** antes de sonido de vocal (the apple) y **de** antes de consonante (the car). Sirve igual para singular y plural, masculino y femenino.",
          ],
        },
        {
          tipo: "vocab",
          titulo: "a (a / éi) // un, una: antes de sonido de consonante",
          items: [
            { en: "a house", pron: "a jáus", es: "una casa" },
            { en: "a car", pron: "a car", es: "un carro" },
            { en: "a university", pron: "a iuniversiti", es: "una universidad" },
            { en: "a uniform", pron: "a iúniform", es: "un uniforme" },
          ],
        },
        {
          tipo: "vocab",
          titulo: "an (an) // un, una: antes de sonido de vocal o h muda",
          items: [
            { en: "an apple", pron: "an ápol", es: "una manzana" },
            { en: "an engineer", pron: "an enchiníer", es: "un ingeniero" },
            { en: "an hour", pron: "an áuer", es: "una hora" },
          ],
        },
        {
          tipo: "nota",
          titulo: "⚠️ Para no aprenderlo como robot",
          items: [
            "Manda el sonido, no la letra: **a** university (suena «iu», consonante) pero **an** hour (la h no suena).",
            "A y an solo van en singular. En plural no hay artículo indefinido: apples, «manzanas» o «unas manzanas».",
          ],
        },
      ],
    },
    pendiente("plural", "El plural del sustantivo"),
    pendiente("contables", "Contables e incontables"),
  ],
};

export const adjetivos: Seccion = {
  slug: "adjetivos",
  titulo: "Adjetivos",
  ingles: "Adjectives",
  resumen: "Los determinativos (this, every, both…) y vocabulario de adjetivos por tema. El adjetivo inglés no cambia: a red car, two red cars.",
  temas: [
    {
      slug: "determinativos",
      titulo: "Adjetivos determinativos",
      resumen: "Van antes del sustantivo para señalarlo o decir cuánto: this book, every day, both hands.",
      bloques: [
        {
          tipo: "vocab",
          items: [
            { en: "this", pron: "dis", es: "este, esta, esto (singular)" },
            { en: "these", pron: "díis", es: "estos, estas (plural)" },
            { en: "that", pron: "dat", es: "ese, esa, eso, aquel, aquella (singular)" },
            { en: "those", pron: "dóus", es: "esos, esas, aquellos (plural)" },
            { en: "all", pron: "ól", es: "todo, toda, todos, todas" },
            { en: "every", pron: "évri", es: "cada (pensando en todos)" },
            { en: "each", pron: "ich", es: "cada (uno por uno)" },
            { en: "both", pron: "bóuz", es: "ambos, los dos" },
            { en: "either", pron: "íder o áider", es: "cualquiera de los dos; ninguno (al negar)" },
            { en: "neither", pron: "níder o náider", es: "ninguno de los dos" },
            { en: "another", pron: "anóder", es: "otro, otra (uno más)" },
            { en: "other", pron: "óder", es: "otro, otros" },
            { en: "the other", pron: "di óder", es: "el otro, la otra, los otros" },
          ],
        },
        {
          tipo: "ejemplos",
          items: [
            { en: "**These** books are mine.", es: "Estos libros son míos." },
            { en: "I study **every** day.", es: "Estudio todos los días.", nota: "Every va con singular aunque signifique «todos»." },
            { en: "**Each** student has a book.", es: "Cada estudiante tiene un libro." },
            { en: "I don't like **either** option.", es: "No me gusta ninguna de las dos opciones." },
            { en: "Can I have **another** coffee?", es: "¿Me das otro café?" },
          ],
        },
      ],
      relacionados: ["adjetivos/vocabulario"],
    },
    {
      slug: "vocabulario",
      titulo: "Colores y tamaños",
      resumen: "Vocabulario de adjetivos por tema, con su pronunciación aproximada.",
      bloques: [
        {
          tipo: "vocab",
          titulo: "Colors // Colores",
          items: [
            { en: "black", pron: "blak", es: "negro" },
            { en: "gray", pron: "gréi", es: "gris" },
            { en: "white", pron: "uáit", es: "blanco" },
            { en: "red", pron: "red", es: "rojo" },
            { en: "green", pron: "gríin", es: "verde" },
            { en: "blue", pron: "blu", es: "azul" },
            { en: "sky blue", pron: "skái blu", es: "celeste" },
            { en: "yellow", pron: "iélou", es: "amarillo" },
            { en: "orange", pron: "órendch", es: "naranja" },
            { en: "brown", pron: "bráun", es: "marrón" },
            { en: "pink", pron: "pink", es: "rosa" },
            { en: "purple", pron: "pérpl", es: "morado, púrpura" },
            { en: "violet", pron: "váiolet", es: "violeta" },
            { en: "beige", pron: "béish", es: "beige" },
            { en: "turquoise", pron: "térkuois", es: "turquesa" },
          ],
        },
        {
          tipo: "vocab",
          titulo: "Size, Measure // Tamaño, medida",
          items: [
            { en: "big", pron: "big", es: "grande" },
            { en: "large", pron: "lárch", es: "grande, amplio" },
            { en: "huge", pron: "jiúch", es: "enorme" },
            { en: "small", pron: "smol", es: "pequeño" },
            { en: "tiny", pron: "táini", es: "diminuto" },
            { en: "heavy", pron: "jévi", es: "pesado" },
            { en: "light", pron: "láit", es: "ligero, liviano" },
            { en: "thick", pron: "zik", es: "grueso, espeso" },
            { en: "thin", pron: "zin", es: "delgado" },
            { en: "wide", pron: "uáid", es: "ancho" },
            { en: "broad", pron: "brood", es: "ancho, amplio" },
            { en: "narrow", pron: "nérou", es: "angosto" },
            { en: "high", pron: "jái", es: "alto, elevado (cosas)" },
            { en: "tall", pron: "tóol", es: "alto (personas, edificios)" },
            { en: "low", pron: "lóu", es: "bajo" },
            { en: "short", pron: "short", es: "corto, bajo" },
            { en: "long", pron: "long", es: "largo" },
            { en: "medium", pron: "mídium", es: "mediano" },
            { en: "deep", pron: "díip", es: "profundo" },
            { en: "shallow", pron: "shálou", es: "poco profundo" },
          ],
        },
        {
          tipo: "nota",
          titulo: "⚠️ Para no aprenderlo como robot",
          items: [
            "High y tall son «alto», pero no se intercambian: **tall** para lo que crece hacia arriba (a tall man, a tall building) y **high** para lo que está arriba o mide altura (a high wall, a high price).",
            "El adjetivo va antes del sustantivo y no tiene plural: a **red** car, two **red** cars.",
          ],
        },
      ],
      relacionados: ["adjetivos/determinativos"],
    },
    pendiente("comparativos", "Comparativos y superlativos"),
  ],
};

export const adverbios: Seccion = {
  slug: "adverbios",
  titulo: "Adverbios",
  ingles: "Adverbs",
  resumen: "De modo (slowly), de frecuencia (always), de tiempo y de lugar.",
  temas: [
    {
      slug: "de-modo",
      titulo: "Adverbios de modo",
      resumen:
        "Dicen cómo se hace algo. Casi todos se forman con el adjetivo + {fin:ly}, que equivale a la terminación «-mente» del español.",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Adjetivo", "Adverbio"],
          filas: [
            ["**slow** (slóu) // lento", "slow{fin:ly} (slóuli) // lenta{fin:mente}"],
            ["**easy** (íisi) // fácil", "eas{fin:ily} (íisili) // fácil{fin:mente}"],
            ["**careful** (kérful) // cuidadoso", "careful{fin:ly} (kérfuli) // cuidadosa{fin:mente}"],
            ["**simple** (símpl) // simple", "simp{fin:ly} (símpli) // simple{fin:mente}"],
            ["**happy** (jápi) // feliz", "happ{fin:ily} (jápili) // feliz{fin:mente}"],
            ["**natural** (náchural) // natural", "natural{fin:ly} (náchurali) // natural{fin:mente}"],
          ],
          pie: "Ortografía: -y pasa a -ily (happy → happily) y -le pasa a -ly (simple → simply).",
        },
        {
          tipo: "tabla",
          titulo: "Excepciones",
          columnas: ["Adjetivo", "Adverbio"],
          filas: [
            ["**good** (guud) // bueno", "**well** (uél) // bien"],
            ["**fast** (fast) // rápido", "**fast** (fast) // rápidamente"],
            ["**hard** (jard) // duro", "**hard** (jard) // duramente, con esfuerzo"],
          ],
        },
        {
          tipo: "ejemplos",
          items: [
            { tipo: "+", en: "She speaks **slow**{fin:ly}.", es: "Ella habla lentamente." },
            { tipo: "+", en: "He plays **well**.", es: "Él juega bien.", nota: "No «He plays good»: good es adjetivo." },
            { tipo: "-", en: "I didn't drive **careful**{fin:ly}.", es: "No manejé con cuidado." },
            { tipo: "?", en: "Did you work **hard**?", es: "¿Trabajaste duro?" },
          ],
        },
        {
          tipo: "nota",
          titulo: "⚠️ Para no aprenderlo como robot",
          items: [
            "**Hardly** existe, pero no es «duramente»: significa «apenas». I hardly slept = apenas dormí.",
            "El adverbio de modo suele ir después del verbo y su objeto: she drives the car **careful**{fin:ly}.",
          ],
        },
      ],
    },
    pendiente("de-frecuencia", "Adverbios de frecuencia (always, usually, never)"),
    pendiente("de-tiempo-y-lugar", "Adverbios de tiempo y lugar"),
  ],
};
