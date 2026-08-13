import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".pdf": "application/pdf", ".webp": "image/webp" };

const server = http.createServer(async (req, res) => {
  const requested = decodeURIComponent((req.url || "/").split("?")[0]);
  const relative = requested === "/" ? "index.html" : requested.replace(/^\/+/, "");
  const publicAsset = relative.startsWith("catalogs\\") || relative.startsWith("catalogs/") || relative.startsWith("company-pages\\") || relative.startsWith("company-pages/") || relative.startsWith("tile-pages\\") || relative.startsWith("tile-pages/") || relative.startsWith("bathroom-pages\\") || relative.startsWith("bathroom-pages/") || relative.startsWith("flooring-pages\\") || relative.startsWith("flooring-pages/") || relative.startsWith("lighting-pages\\") || relative.startsWith("lighting-pages/");
  const fileRoot = publicAsset ? join(root, "public") : root;
  const file = normalize(join(fileRoot, relative));
  if (!file.startsWith(normalize(root))) {
    res.writeHead(403); res.end("Forbidden"); return;
  }
  try {
    const body = await readFile(file);
    const extension = extname(file).toLowerCase();
    const cacheControl = extension === ".webp" || extension === ".pdf"
      ? "public, max-age=604800, immutable"
      : "no-cache";
    res.writeHead(200, { "Content-Type": types[extension] || "application/octet-stream", "Cache-Control": cacheControl });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); res.end("Not found");
  }
});

server.listen(port, host, () => console.log(`Cangxuan catalog running on ${host}:${port}`));
