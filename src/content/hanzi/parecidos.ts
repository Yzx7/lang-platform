/**
 * Caracteres que se confunden a la vista (形近字). Esto no sale de ningún dato:
 * se escribe a mano, con la diferencia que hay que mirar.
 */
export const formasParecidas: { caracteres: string; pista: string }[] = [
  { caracteres: "己已", pista: "己 (uno mismo) queda abierto arriba; en 已 (ya) el trazo sube hasta la mitad." },
  { caracteres: "未末", pista: "En 未 (todavía no) la raya de arriba es la corta; en 末 (final) es la larga." },
  { caracteres: "人入八", pista: "En 人 manda el trazo de la izquierda, en 入 el de la derecha; 八 tiene los dos trazos separados." },
  { caracteres: "土士", pista: "土 (tierra) tiene la raya larga abajo; 士 (erudito), arriba." },
  { caracteres: "日曰", pista: "日 (sol) es alto y angosto; 曰 (decir) es bajo y ancho." },
  { caracteres: "天夫", pista: "En 夫 el trazo vertical asoma por encima de la raya de arriba; en 天 no." },
  { caracteres: "买卖", pista: "卖 (vender) es 买 (comprar) con 十 encima: hay que tener algo para vender." },
  { caracteres: "大太犬", pista: "太 lleva un punto abajo; 犬 (perro), arriba a la derecha." },
  { caracteres: "王玉主", pista: "玉 (jade) lleva el punto abajo a la derecha; 主 (dueño), arriba." },
  { caracteres: "力刀", pista: "En 力 (fuerza) el trazo inclinado cruza por arriba; en 刀 (cuchillo) no la cruza." },
  { caracteres: "午牛", pista: "En 牛 (vaca) el trazo vertical asoma por arriba; en 午 (mediodía) no." },
  { caracteres: "千干", pista: "千 (mil) empieza con un trazo inclinado; 干 (hacer), con una raya horizontal." },
  { caracteres: "体休", pista: "休 (descansar) es una persona 亻 junto a un árbol 木; 体 (cuerpo) lleva 本, con una raya más abajo." },
  { caracteres: "问间", pista: "问 (preguntar) tiene una boca 口 en la puerta; 间 (entre) tiene el sol 日 asomando entre las puertas." },
  { caracteres: "找我", pista: "我 (yo) tiene un trazo más arriba a la izquierda; 找 (buscar) empieza con la mano 扌." },
  { caracteres: "白自百", pista: "白 (blanco) tiene una raya dentro y 自 (uno mismo) dos; 百 (cien) es 白 con 一 encima." },
  { caracteres: "贝见", pista: "贝 (concha) termina en un punto; 见 (ver) termina en 儿, con gancho." },
  { caracteres: "儿几", pista: "几 (cuántos) tiene una raya arriba que cierra; 儿 queda abierto." },
  { caracteres: "话活", pista: "Mismo componente de sonido 舌: 话 (habla) lleva 讠 de palabra; 活 (vivir) lleva 氵 de agua." },
  { caracteres: "住往", pista: "住 (vivir) lleva 亻 de persona; 往 (hacia) lleva 彳 de paso, de caminar." },
];
