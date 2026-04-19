import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC_A = '/Volumes/STORE N GO/Food_Time/1st/Jpeg/01.jpg';
const SRC_B = '/Volumes/STORE N GO/Food_Time/2nd/Jpeg/DSC_4006.JPG';
const OUT = '/Users/pc/Desktop/coding-projects/foodtime-next/public/images/gallery/hero/00-locations.webp';

mkdirSync('/Users/pc/Desktop/coding-projects/foodtime-next/public/images/gallery/hero', { recursive: true });

const H = 900; // target height for each panel
const GAP = 0; // seam between panels

const [a, b] = await Promise.all([
  sharp(SRC_A).rotate().resize({ height: H, withoutEnlargement: false }).toBuffer({ resolveWithObject: true }),
  sharp(SRC_B).rotate().resize({ height: H, withoutEnlargement: false }).toBuffer({ resolveWithObject: true }),
]);

const wA = a.info.width;
const wB = b.info.width;
const totalW = wA + wB + GAP;

console.log(`A: ${wA}x${a.info.height}  B: ${wB}x${b.info.height}  Total: ${totalW}x${H}`);

await sharp({
  create: { width: totalW, height: H, channels: 3, background: { r: 0, g: 0, b: 0 } }
})
  .composite([
    { input: a.data, left: 0, top: 0 },
    { input: b.data, left: wA + GAP, top: 0 },
  ])
  .webp({ quality: 82 })
  .toFile(OUT);

console.log(`Wrote ${OUT}`);
