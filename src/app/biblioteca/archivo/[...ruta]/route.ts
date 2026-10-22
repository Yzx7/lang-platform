import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

// Sirve los PDF y mp3 de /HSK. Esa carpeta está fuera de git (material con derechos
// de autor), así que en un despliegue no existe y todo responde 404.
const RAIZ = path.join(process.cwd(), "HSK");
const TIPOS: Record<string, string> = { ".pdf": "application/pdf", ".mp3": "audio/mpeg" };

export async function GET(request: Request, ctx: RouteContext<"/biblioteca/archivo/[...ruta]">) {
  const { ruta } = await ctx.params;
  const archivo = path.resolve(RAIZ, ...ruta);
  const tipo = TIPOS[path.extname(archivo).toLowerCase()];
  if (!archivo.startsWith(RAIZ + path.sep) || !tipo) return new Response(null, { status: 404 });

  let tamaño: number;
  try {
    tamaño = (await stat(archivo)).size;
  } catch {
    return new Response(null, { status: 404 });
  }

  const base = { "Content-Type": tipo, "Accept-Ranges": "bytes", "Cache-Control": "private, max-age=86400" };
  const flujo = (opciones?: { start: number; end: number }) =>
    Readable.toWeb(createReadStream(archivo, opciones)) as ReadableStream;

  // PDF.js pide los libros por partes (Range) para no bajar 200 MB de golpe,
  // y el audio lo necesita para poder adelantar.
  const rango = request.headers.get("range")?.match(/^bytes=(\d*)-(\d*)$/);
  if (!rango) return new Response(flujo(), { headers: { ...base, "Content-Length": String(tamaño) } });

  const [, desde, hasta] = rango;
  const inicio = desde ? Number(desde) : tamaño - Number(hasta);
  const fin = desde && hasta ? Math.min(Number(hasta), tamaño - 1) : tamaño - 1;
  if (inicio < 0 || inicio > fin) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${tamaño}` } });
  }
  return new Response(flujo({ start: inicio, end: fin }), {
    status: 206,
    headers: { ...base, "Content-Length": String(fin - inicio + 1), "Content-Range": `bytes ${inicio}-${fin}/${tamaño}` },
  });
}
