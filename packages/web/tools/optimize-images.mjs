import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const source = path.join(publicDir, "images/images");
const output = path.join(publicDir, "images/optimized");
const widths = [480, 960, 1600];
await mkdir(output, { recursive: true });
sharp.concurrency(1);
let originalBytes = 0;
let optimizedBytes = 0;

for (const name of (await readdir(source)).filter((name) => /\.jpg$/i.test(name)).sort()) {
  const input = path.join(source, name);
  originalBytes += (await stat(input)).size;
  for (const width of widths) {
    const target = path.join(output, `${path.parse(name).name}-${width}.webp`);
    await sharp(input)
      .rotate()
      .resize({
        width,
        height: width,
        fit: "contain",
        background: "#eeebe7",
        withoutEnlargement: true,
      })
      .webp({ quality: 80, effort: 4 })
      .toFile(target);
    if (width === 480) optimizedBytes += (await stat(target)).size;
  }
}

console.log(
  `Fotos originais preservadas. Miniaturas: ${(originalBytes / 1024 / 1024).toFixed(1)} MB → ${(optimizedBytes / 1024 / 1024).toFixed(1)} MB (${Math.round((1 - optimizedBytes / originalBytes) * 100)}% menores).`,
);
