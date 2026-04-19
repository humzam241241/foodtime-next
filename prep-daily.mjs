import sharp from 'sharp';

const OUT = '/Users/pc/Desktop/coding-projects/foodtime-next/public/images/gallery/daily';

const jobs = [
  ['/Users/pc/Library/Messages/Attachments/f3/03/3F717315-5017-4104-9BFC-6AB668282D03/unknown.png',                'tuesday'],
  ['/Users/pc/Library/Messages/Attachments/62/02/C0D74AD7-E583-47D6-9D30-FB4A8666ABEC/1__#$!@%!#__unknown.png',    'wednesday'],
  ['/Users/pc/Library/Messages/Attachments/70/00/ABCD958C-34A0-4CB1-9DF3-B6D0ACAAB3CC/2__#$!@%!#__unknown.png',    'thursday'],
  ['/Users/pc/Library/Messages/Attachments/b6/06/52BB423A-D108-4AEA-9A4A-EAAFB81CB6F9/3__#$!@%!#__unknown.png',    'friday'],
  ['/Users/pc/Library/Messages/Attachments/69/09/45556778-8502-4448-A4E9-D5112EE09BF4/4__#$!@%!#__unknown.png',    'saturday'],
  ['/Users/pc/Library/Messages/Attachments/ef/15/5C2F9D6A-3AA7-4072-A52D-4BB8C0177930/5__#$!@%!#__unknown.png',    'sunday'],
];

for (const [src, day] of jobs) {
  const out = `${OUT}/${day}.webp`;
  await sharp(src).rotate().resize({ width: 1600, withoutEnlargement: false }).webp({ quality: 85 }).toFile(out);
  console.log(`Wrote ${out}`);
}
