import { pendiente, type Seccion } from "../tipos";

export const verbos: Seccion = {
  slug: "verbos",
  titulo: "Verbos principales",
  ingles: "Main verbs",
  resumen: "Las 5 formas de cada verbo, to be, los auxiliares (do, have, will) y los modales.",
  temas: [
    {
      slug: "formas-del-verbo",
      titulo: "Las 5 formas del verbo",
      resumen:
        "Cada verbo tiene 5 formas y se usan según el sujeto y el tiempo. Con estas 5, más los auxiliares, se arman los 12 tiempos.",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Forma", "Para qué", "do (hacer)", "play (jugar)"],
          filas: [
            ["V1", "presente con I, you, we, they", "**do** // hago", "**play** // juego"],
            ["V2", "pasado", "**did** // hice", "play{fin:ed} // jugué"],
            ["V3", "participio (después de have)", "**done** // hecho", "play{fin:ed} // jugado"],
            ["V4", "gerundio (después de to be)", "do{fin:ing} // haciendo", "play{fin:ing} // jugando"],
            ["V5", "presente con he, she, it", "do{fin:es} // hace", "play{fin:s} // juega"],
          ],
        },
        {
          tipo: "texto",
          titulo: "Regulares e irregulares",
          parrafos: [
            "En los verbos **regulares**, el pasado (V2) y el participio (V3) son iguales y terminan en {fin:ed}: play{fin:ed}, walk{fin:ed}, kiss{fin:ed}, start{fin:ed}. Si el verbo ya termina en -e, solo se agrega {fin:d}: love{fin:d}, change{fin:d}, believe{fin:d}, close{fin:d}.",
            "Los **irregulares** hay que aprenderlos: do → did → done, go → went → gone, have → had → had. Son pocos, pero son los más usados.",
          ],
        },
        {
          tipo: "tabla",
          columnas: ["V1", "V2 pasado", "V3 participio", "V4 gerundio", "V5 3.ª persona"],
          filas: [
            ["walk", "walk{fin:ed}", "walk{fin:ed}", "walk{fin:ing}", "walk{fin:s}"],
            ["love", "love{fin:d}", "love{fin:d}", "lov{fin:ing}", "love{fin:s}"],
            ["go", "**went**", "**gone**", "go{fin:ing}", "go{fin:es}"],
            ["have", "**had**", "**had**", "hav{fin:ing}", "**has**"],
          ],
          pie: "Con -e final, el gerundio la pierde: love → lov{fin:ing}, live → liv{fin:ing}.",
        },
      ],
      relacionados: ["verbos/to-be", "verbos/auxiliares", "tiempos/los-12-tiempos"],
    },
    {
      slug: "to-be",
      titulo: "El verbo to be: ser y estar",
      resumen: "To be significa «ser» o «estar» en cualquier tiempo, pero su forma cambia según el sujeto.",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Sujeto", "Presente\n(soy / estoy)", "Pasado\n(fui / estuve)", "Futuro\n(seré / estaré)"],
          filas: [
            ["I", "I {be:am}\nI{be:'m} {neg:not}", "I {be:was}\nI {be:was}{neg:n't}", "I {will:will} {be:be}\nI {will:wo}{neg:n't} {be:be}"],
            ["You · We · They", "{be:are}\n{be:are}{neg:n't}", "{be:were}\n{be:were}{neg:n't}", "{will:will} {be:be}\n{will:wo}{neg:n't} {be:be}"],
            ["He · She · It", "{be:is}\n{be:is}{neg:n't}", "{be:was}\n{be:was}{neg:n't}", "{will:will} {be:be}\n{will:wo}{neg:n't} {be:be}"],
          ],
          pie: "No existe «amn't»: la negativa con I es I'm not. Won't = will not.",
        },
        {
          tipo: "ejemplos",
          items: [
            { tipo: "+", en: "I {be:am} a student.", es: "Soy estudiante." },
            { tipo: "-", en: "She {be:is}{neg:n't} at home.", es: "Ella no está en casa." },
            { tipo: "?", en: "{be:Are} you tired?", es: "¿Estás cansado?", nota: "Para preguntar, to be va antes del sujeto: no necesita do." },
            { tipo: "+", en: "We {be:were} happy.", es: "Estábamos (fuimos) felices." },
            { tipo: "+", en: "It {will:will} {be:be} cold tomorrow.", es: "Mañana hará frío." },
          ],
        },
      ],
      relacionados: ["verbos/formas-del-verbo", "verbos/auxiliares"],
    },
    {
      slug: "auxiliares",
      titulo: "Los auxiliares: do, have, will",
      resumen:
        "Los auxiliares se combinan con otros verbos para formar los tiempos compuestos, las negativas y las preguntas. Cada tiempo usa el suyo.",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Tiempo", "Auxiliar", "Ejemplo"],
          filas: [
            ["Presente simple", "I, you, we, they: {do:do} / {do:do}{neg:n't}\nhe, she, it: {do:does} / {do:does}{neg:n't}", "I {do:do}{neg:n't} play. // No juego.\n{do:Does} she play? // ¿Ella juega?"],
            ["Pasado simple", "todos: {do:did} / {do:did}{neg:n't}", "I {do:did}{neg:n't} play. // No jugué."],
            ["Presente perfecto", "I, you, we, they: {have:have} / {have:have}{neg:n't}\nhe, she, it: {have:has} / {have:has}{neg:n't}", "She {have:has} played. // Ella ha jugado."],
            ["Pasado perfecto", "todos: {have:had} / {have:had}{neg:n't}", "I {have:had} played. // Yo había jugado."],
            ["Futuro simple", "todos: {will:will} / {will:wo}{neg:n't}", "I {will:will} play. // Jugaré."],
            ["Futuro perfecto", "todos: {will:will have}", "I {will:will} {have:have} played. // Habré jugado."],
          ],
        },
        {
          tipo: "nota",
          titulo: "⚠️ Para no aprenderlo como robot",
          items: [
            "Do y have también son verbos normales: I **do** my homework (hago mi tarea), I **have** a car (tengo un carro). Como auxiliares no se traducen solos: solo marcan el tiempo.",
            "En el presente y el pasado simple, la afirmativa no lleva auxiliar (I play, I played); el {do:do} aparece solo al negar o preguntar.",
          ],
        },
      ],
      relacionados: ["verbos/to-be", "tiempos/presente-pasado-futuro"],
    },
    {
      slug: "modales",
      titulo: "Verbos modales",
      resumen:
        "Van antes del verbo (sin «to», salvo ought to) y no cambian con el sujeto: she {modal:can}, no she cans. Cada uno agrega una idea: poder, deber, posibilidad…",
      bloques: [
        {
          tipo: "ejemplos",
          titulo: "Can: poder (habilidad o posibilidad)",
          items: [
            { tipo: "+", en: "I {modal:can} teach you.", es: "Puedo enseñarte." },
            { tipo: "-", en: "She {modal:can}{neg:'t} come this weekend.", es: "Ella no puede venir este fin de semana." },
            { tipo: "?", en: "{modal:Can} she play the drums?", es: "¿Ella puede tocar la batería?" },
          ],
        },
        {
          tipo: "ejemplos",
          titulo: "Could: pasado de can, posibilidad y pedidos formales",
          items: [
            { tipo: "+", en: "You {modal:could} get up early.", es: "Podrías levantarte temprano." },
            { tipo: "-", en: "I {modal:could} {neg:not} deliver my work.", es: "No pude entregar mi trabajo." },
            { tipo: "?", en: "{modal:Could} you call me later, please?", es: "¿Podrías llamarme luego, por favor?" },
          ],
        },
        {
          tipo: "ejemplos",
          titulo: "May: probabilidad, posibilidad o permiso formal",
          items: [
            { tipo: "+", en: "He {modal:may} be proud of her.", es: "Él podría estar orgulloso de ella." },
            { tipo: "-", en: "They {modal:may} {neg:not} publish our book.", es: "Puede que no publiquen nuestro libro." },
            { tipo: "?", en: "{modal:May} I go to the bathroom?", es: "¿Puedo ir al baño?" },
          ],
        },
        {
          tipo: "ejemplos",
          titulo: "Might: posibilidad (menos segura que may), sugerencias y ofrecimientos",
          items: [
            { tipo: "+", en: "I {modal:might} help you.", es: "Quizá pueda ayudarte." },
            { tipo: "-", en: "This phone {modal:might} {neg:not} work, it's too old.", es: "Puede que este teléfono no funcione, es muy viejo." },
            { tipo: "?", en: "{modal:Might} I find him tomorrow?", es: "¿Podría encontrarlo mañana?", nota: "Preguntar con might suena muy formal." },
          ],
        },
        {
          tipo: "ejemplos",
          titulo: "Will: futuro, intención clara o decisión del momento",
          items: [
            { tipo: "+", en: "They {will:will} learn Japanese.", es: "Ellos aprenderán japonés." },
            { tipo: "-", en: "He {will:wo}{neg:n't} take the bus with us.", es: "Él no tomará el bus con nosotros." },
            { tipo: "?", en: "{will:Will} she write a complaint?", es: "¿Ella escribirá una queja?" },
          ],
        },
        {
          tipo: "ejemplos",
          titulo: "Would: condicional, costumbres del pasado y pedidos amables",
          items: [
            { tipo: "+", en: "He {modal:would} ride his own horse every summer.", es: "Él montaba su propio caballo todos los veranos.", nota: "Costumbre del pasado: se traduce con el imperfecto." },
            { tipo: "-", en: "She {modal:would} never go to that place.", es: "Ella nunca iría a ese lugar." },
            { tipo: "?", en: "{modal:Would} you be my Valentine?", es: "¿Serías mi San Valentín?" },
          ],
        },
        {
          tipo: "ejemplos",
          titulo: "Must: obligación o necesidad (también suposición)",
          items: [
            { tipo: "+", en: "You {modal:must} show appreciation.", es: "Debes mostrar agradecimiento." },
            { tipo: "-", en: "He {modal:must} {neg:not} return later.", es: "Él no debe regresar tarde." },
            { tipo: "?", en: "{modal:Must} they come for breakfast?", es: "¿Tienen que venir a desayunar?" },
          ],
        },
        {
          tipo: "ejemplos",
          titulo: "Shall: como will, casi en desuso en Estados Unidos",
          items: [
            { tipo: "+", en: "We {modal:shall} ask first.", es: "Preguntaremos primero." },
            { tipo: "-", en: "She {modal:shall} {neg:not} enter!", es: "¡Ella no entrará!" },
            { tipo: "?", en: "{modal:Shall} I call an ambulance?", es: "¿Llamo a una ambulancia?", nota: "Shall I…? sirve para ofrecer algo: «¿quieres que…?»." },
          ],
        },
        {
          tipo: "ejemplos",
          titulo: "Should: debería (recomendación u obligación suave)",
          items: [
            { tipo: "+", en: "She {modal:should} take a painkiller.", es: "Ella debería tomar un analgésico." },
            { tipo: "-", en: "I {modal:should} {neg:not} lose the guarantee.", es: "No debería perder la garantía." },
            { tipo: "?", en: "{modal:Should} I do it now?", es: "¿Debería hacerlo ahora?" },
          ],
        },
        {
          tipo: "ejemplos",
          titulo: "Ought to: como should, menos usado",
          items: [
            { tipo: "+", en: "I {modal:ought to} go before the sunset.", es: "Debería irme antes del atardecer." },
            { tipo: "-", en: "She {modal:ought} {neg:not} {modal:to} be ashamed.", es: "Ella no debería avergonzarse." },
            { tipo: "?", en: "{modal:Ought} we {modal:to} talk about it?", es: "¿Deberíamos hablar de ello?", nota: "Muy formal: lo normal es Should we talk about it?" },
          ],
        },
        {
          tipo: "constructor",
          titulo: "Can y be able to en cada tiempo",
          columnas: [
            { titulo: "Presente", es: "puedo" },
            { titulo: "Pasado", es: "podía / era capaz" },
            { titulo: "Futuro", es: "podré / seré capaz" },
            { titulo: "Condicional", es: "podría" },
          ],
          filas: [
            {
              sujetos: ["You", "We", "They", "I", "She", "He", "It"],
              celdas: [
                { piezas: ["{modal:can}", "{modal:can}{neg:'t}"] },
                { piezas: ["{modal:could}", "{be:were} / {be:was} able"] },
                { piezas: ["{will:will} {be:be} able"] },
                { piezas: ["{modal:could}"] },
              ],
            },
          ],
          pie: ["Can no tiene futuro ni participio: en esos tiempos se usa to be able («ser capaz»), y to be cambia como siempre."],
        },
      ],
      relacionados: ["verbos/auxiliares", "tiempos/presente-pasado-futuro"],
    },
  ],
};

export const tiempos: Seccion = {
  slug: "tiempos",
  titulo: "Tiempos verbales",
  ingles: "Tenses",
  resumen: "Los 12 tiempos: tres momentos (presente, pasado, futuro) por cuatro aspectos (simple, progresivo, perfecto, perfecto progresivo).",
  temas: [
    {
      slug: "los-12-tiempos",
      titulo: "Una oración en los 12 tiempos",
      resumen:
        "Los 12 tiempos salen de cruzar dos preguntas: cuándo pasa (presente, pasado, futuro) y cómo está la acción (simple, en curso, terminada o terminada después de durar).",
      bloques: [
        {
          tipo: "texto",
          parrafos: [
            "La misma oración, «I do my homework» (hago mi tarea), pasada por los 12 tiempos. Fíjate en que el español hace casi lo mismo: {be:estar} para lo que está en curso, {have:haber} para lo terminado, y el futuro lo marca la terminación ({will:-é}, como el {will:will}).",
          ],
        },
        {
          tipo: "tabla",
          titulo: "Con I (yo)",
          columnas: ["", "Simple", "Progresivo\n(en curso)", "Perfecto\n(terminado)", "Perfecto progresivo\n(terminado tras durar)"],
          filas: [
            [
              "Presente",
              "I **do** my homework // yo **hago** mi tarea",
              "I{be:'m} **do**{fin:ing} my homework // yo {be:estoy} **hac**{fin:iendo} mi tarea",
              "I {have:have} **done** my homework // yo {have:he} **hecho** mi tarea",
              "I {have:have} {be:been} **do**{fin:ing} my homework // yo {have:he} {be:estado} **hac**{fin:iendo} mi tarea",
            ],
            [
              "Pasado",
              "I **did** my homework // yo **hice** mi tarea",
              "I {be:was} **do**{fin:ing} my homework // yo {be:estaba} **hac**{fin:iendo} mi tarea",
              "I {have:had} **done** my homework // yo {have:había} **hecho** mi tarea",
              "I {have:had} {be:been} **do**{fin:ing} my homework // yo {have:había} {be:estado} **hac**{fin:iendo} mi tarea",
            ],
            [
              "Futuro",
              "I {will:will} **do** my homework // yo **har**{will:é} mi tarea",
              "I {will:will} {be:be} **do**{fin:ing} my homework // yo {be:estar}{will:é} **hac**{fin:iendo} mi tarea",
              "I {will:will} {have:have} **done** my homework // yo {have:habr}{will:é} **hecho** mi tarea",
              "I {will:will} {have:have} {be:been} **do**{fin:ing} my homework // yo {have:habr}{will:é} {be:estado} **hac**{fin:iendo} mi tarea",
            ],
          ],
        },
        {
          tipo: "tabla",
          titulo: "Con she (ella)",
          columnas: ["", "Simple", "Progresivo", "Perfecto", "Perfecto progresivo"],
          filas: [
            [
              "Presente",
              "She **do**{fin:es} her homework // ella **hace** su tarea",
              "She {be:is} **do**{fin:ing} her homework // ella {be:está} **hac**{fin:iendo} su tarea",
              "She {have:has} **done** her homework // ella {have:ha} **hecho** su tarea",
              "She {have:has} {be:been} **do**{fin:ing} her homework // ella {have:ha} {be:estado} **hac**{fin:iendo} su tarea",
            ],
            [
              "Pasado",
              "She **did** her homework // ella **hizo** su tarea",
              "She {be:was} **do**{fin:ing} her homework // ella {be:estaba} **hac**{fin:iendo} su tarea",
              "She {have:had} **done** her homework // ella {have:había} **hecho** su tarea",
              "She {have:had} {be:been} **do**{fin:ing} her homework // ella {have:había} {be:estado} **hac**{fin:iendo} su tarea",
            ],
            [
              "Futuro",
              "She {will:will} **do** her homework // ella **har**{will:á} su tarea",
              "She {will:will} {be:be} **do**{fin:ing} her homework // ella {be:estar}{will:á} **hac**{fin:iendo} su tarea",
              "She {will:will} {have:have} **done** her homework // ella {have:habr}{will:á} **hecho** su tarea",
              "She {will:will} {have:have} {be:been} **do**{fin:ing} her homework // ella {have:habr}{will:á} {be:estado} **hac**{fin:iendo} su tarea",
            ],
          ],
          pie: "Solo cambia el presente: does, is, has. En el pasado y el futuro, she usa lo mismo que I.",
        },
        {
          tipo: "nota",
          titulo: "⚠️ Para no aprenderlo como robot",
          items: [
            "El pasado progresivo se traduce casi siempre con el imperfecto: I {be:was} doing = yo {be:estaba} haciendo (no «estuve»).",
            "El presente perfecto no siempre es «he hecho»: I {have:have} lived here for two years = vivo aquí desde hace dos años.",
          ],
        },
      ],
      relacionados: ["tiempos/presente-pasado-futuro", "verbos/formas-del-verbo", "verbos/auxiliares"],
    },
    {
      slug: "presente-pasado-futuro",
      titulo: "Presente, pasado y futuro en tablas",
      resumen:
        "Las tablas no muestran oraciones: muestran las piezas para armarlas. Elige el sujeto (fila), el tiempo (columna) y combina lo que hay en la celda.",
      bloques: [
        {
          tipo: "constructor",
          titulo: "Presente",
          columnas: [
            { titulo: "Presente progresivo", es: "estoy / soy" },
            { titulo: "Presente simple", es: "hago / juego" },
            { titulo: "Presente perfecto", es: "he" },
          ],
          filas: [
            {
              sujetos: ["I"],
              celdas: [
                { piezas: ["{be:am}", "{be:am} {neg:not}"], ejemplo: "am play{fin:ing}" },
                { piezas: ["{do:do}", "{do:do}{neg:n't}"], lista: ["play", "jump", "live"], filas: 2 },
                { piezas: ["{have:have}"], filas: 2 },
              ],
            },
            {
              sujetos: ["You", "We", "They"],
              celdas: [{ piezas: ["{be:are}", "{be:are}{neg:n't}"], ejemplo: "are play{fin:ing}" }, null, null],
            },
            {
              sujetos: ["She", "He", "It"],
              celdas: [
                { piezas: ["{be:is}", "{be:is}{neg:n't}"], ejemplo: "is play{fin:ing}" },
                { piezas: ["{do:does}", "{do:does}{neg:n't}"], lista: ["play{fin:s}", "jump{fin:s}", "live{fin:s}"] },
                { piezas: ["{have:has}"] },
              ],
            },
          ],
          preguntas: [
            { formula: "{be}{suj}{v:ing} ?", ejemplos: ["{be:am} I playing?", "{be:are} you playing?", "{be:is} she playing?"] },
            { formula: "{do:do} {suj}{v} ?   {do:does} {suj}{v} ?", ejemplos: ["{do:do} I play?", "{do:does} she play?"] },
            { formula: "{have}{suj}{v:ed} ?", ejemplos: ["{have:have} I played?", "{have:has} she played?"] },
          ],
          pie: [
            "En el simple, la afirmativa va sin do (I play, she play{fin:s}); do aparece al negar y preguntar, y entonces el verbo vuelve a su forma base: she {do:does}{neg:n't} play.",
            "Ain't se oye en el habla informal en lugar de am not, isn't o aren't, pero no se escribe.",
          ],
        },
        {
          tipo: "constructor",
          titulo: "Pasado",
          columnas: [
            { titulo: "Pasado progresivo", es: "estaba" },
            { titulo: "Pasado simple", es: "hice / jugué" },
            { titulo: "Pasado perfecto", es: "había" },
          ],
          filas: [
            {
              sujetos: ["You", "We", "They"],
              celdas: [
                { piezas: ["{be:were}", "{be:were}{neg:n't}"] },
                {
                  piezas: ["{do:did}", "{do:did}{neg:n't}"],
                  lista: ["play{fin:ed}", "walk{fin:ed}", "kiss{fin:ed}", "start{fin:ed}", "love{fin:d}", "change{fin:d}", "believe{fin:d}", "close{fin:d}"],
                  filas: 2,
                },
                { piezas: ["{have:had}"], filas: 2 },
              ],
            },
            {
              sujetos: ["I", "She", "He", "It"],
              celdas: [{ piezas: ["{be:was}", "{be:was}{neg:n't}"] }, null, null],
            },
          ],
          preguntas: [
            { formula: "{be}{suj}{v:ing} ?", ejemplos: ["{be:were} you playing?", "{be:was} she playing?"] },
            { formula: "{do:did} {suj}{v} ?", ejemplos: ["{do:did} you play?"] },
            { formula: "{have}{suj}{v:ed} ?", ejemplos: ["{have:had} you played?"] },
          ],
          pie: ["Did y had son iguales para todos los sujetos: solo to be cambia (was / were). Con did, el verbo va sin -ed: I {do:did}{neg:n't} play."],
        },
        {
          tipo: "constructor",
          titulo: "Futuro",
          columnas: [
            { titulo: "Futuro progresivo", es: "estaré / seré" },
            { titulo: "Futuro simple", es: "haré / jugaré" },
            { titulo: "Futuro perfecto", es: "habré" },
          ],
          filas: [
            {
              sujetos: ["You", "We", "They", "I", "She", "He", "It"],
              celdas: [
                { piezas: ["{will:will} {be:be}", "{will:will} {neg:not} {be:be}", "{will:wo}{neg:n't} {be:be}"] },
                {
                  piezas: ["{will:will}", "{will:will} {neg:not}", "{will:wo}{neg:n't}"],
                  lista: ["do", "play", "walk", "kiss", "start", "love", "change", "believe", "close"],
                },
                { piezas: ["{will:will} {have:have}"] },
              ],
            },
          ],
          preguntas: [
            { formula: "{will:will} {suj}{be}{v:ing} ?", ejemplos: ["{will:will} you be playing?"] },
            { formula: "{will:will} {suj}{v} ?", ejemplos: ["{will:will} you play?"] },
            { formula: "{will:will} {suj}{have}{v:ed} ?", ejemplos: ["{will:will} you have played?"] },
          ],
          pie: [
            "En el futuro todo es igual para todos los sujetos. Con will, el verbo va en infinitivo (sin to).",
            "Si cambias {will:will} por {modal:would}, tienes el condicional: I ({will:will} | {modal:would}) play = yo (jugaré | jugaría) · I ({will:will} | {modal:would}) walk = yo (caminaré | caminaría) · I ({will:will} | {modal:would}) have = yo (habré | habría).",
          ],
        },
      ],
      relacionados: ["tiempos/los-12-tiempos", "verbos/auxiliares", "verbos/to-be"],
    },
    pendiente("usos-de-cada-tiempo", "Cuándo usar cada tiempo"),
    pendiente("going-to", "Futuro con going to"),
  ],
};
