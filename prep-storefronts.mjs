import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const BASE = '/Users/pc/Desktop/coding-projects/foodtime-next/public/images/locations';
mkdirSync(BASE, { recursive: true });

const jobs = [
  { src: '/Volumes/STORE N GO/Food_Time/2nd/Jpeg/DSC_3924.JPG', out: `${BASE}/pickering.webp` }, // red/white storefront
  { src: '/Volumes/STORE N GO/Food_Time/2nd/Jpeg/DSC_3932.JPG', out: `${BASE}/whitby.webp` },     // yellow/black storefront
];

for (const { src, out } of jobs) {
  await sharp(src)
    .rotate()
    .resize({ width: 1600, height: 1200, fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(`Wrote ${out}`);
}
