/**
 * Generate FoodTime_Cost_Template.xlsx
 *
 * Internal operations workbook. For every orderable item on the dine-in
 * menu (with each meat variant broken out as its own row), produces:
 *
 *   Cost of Meat · Cost of Vegetables · Cost of Spices · Cost of Labour ·
 *   Cost of Packaging · Markup % · Final Price (formula)
 *
 * Final Price is computed live in Excel:
 *   = (Meat + Veg + Spices + Labour + Packaging) × (1 + Markup% / 100)
 *
 * Sheets:
 *   • Instructions     — how to use the template
 *   • Menu Costs       — every item, blank cost cells, auto Final Price
 *   • Catering         — per-person cost build-up per package with margin %
 *
 * Usage:
 *   node generate-cost-template.mjs
 */

import ExcelJS from 'exceljs';
import fs from 'fs';

const OUT = 'FoodTime_Cost_Template.xlsx';

// ─── Menu items (authoritative source: src/data/menu.ts, dine-in) ──────
// Variants are broken out into distinct rows because meat cost differs
// across Chicken / Veal / Lamb / Goat / etc.
const MENU_ROWS = [
  // Appetizers / Snacks
  ['Appetizers / Snacks', 'Shami Kabab (2 Pcs.)'],
  ['Appetizers / Snacks', 'Chat Papri'],
  ['Appetizers / Snacks', 'Aloo Channa Chaat'],
  ['Appetizers / Snacks', 'Veggie Pakoras (6 Pcs.)'],
  ['Appetizers / Snacks', 'Chicken Pakoras (6 Pcs.)'],
  ['Appetizers / Snacks', 'Vegetable Samosa (per piece)'],

  // Vegetarian Dishes
  ['Vegetarian Dishes', 'Pakora Curry'],
  ['Vegetarian Dishes', 'Mash / Shahi Daal'],
  ['Vegetarian Dishes', 'Mixed Vegetables'],
  ['Vegetarian Dishes', 'Channa Masala'],
  ['Vegetarian Dishes', 'Palak Aloo'],
  ['Vegetarian Dishes', 'Mutter Aloo'],
  ['Vegetarian Dishes', 'Palak Paneer'],
  ['Vegetarian Dishes', 'Mutter Paneer'],
  ['Vegetarian Dishes', 'Paneer Makhani'],
  ['Vegetarian Dishes', 'Baighan'],

  // Curry Dishes (meat variants broken out)
  ['Curry Dishes', 'Qorma — Chicken'],
  ['Curry Dishes', 'Qorma — Chicken Boneless'],
  ['Curry Dishes', 'Qorma — Veal'],
  ['Curry Dishes', 'Qorma — Lamb / Goat'],
  ['Curry Dishes', 'Karahi — Chicken'],
  ['Curry Dishes', 'Karahi — Chicken Boneless'],
  ['Curry Dishes', 'Karahi — Veal'],
  ['Curry Dishes', 'Karahi — Goat'],
  ['Curry Dishes', 'Palak Gosht — Chicken'],
  ['Curry Dishes', 'Palak Gosht — Chicken Boneless'],
  ['Curry Dishes', 'Palak Gosht — Veal'],
  ['Curry Dishes', 'Palak Gosht — Lamb / Goat'],
  ['Curry Dishes', 'Daal Gosht — Chicken'],
  ['Curry Dishes', 'Daal Gosht — Chicken Boneless'],
  ['Curry Dishes', 'Daal Gosht — Veal'],
  ['Curry Dishes', 'Vindaloo — Chicken'],
  ['Curry Dishes', 'Vindaloo — Chicken Boneless'],
  ['Curry Dishes', 'Vindaloo — Veal'],
  ['Curry Dishes', 'Chicken Jalfrazi'],
  ['Curry Dishes', 'Chicken Chilli'],
  ['Curry Dishes', 'Butter Chicken'],
  ['Curry Dishes', 'Chicken Tikka Masala'],
  ['Curry Dishes', 'Nahari'],
  ['Curry Dishes', 'Paya'],
  ['Curry Dishes', 'Haleem'],
  ['Curry Dishes', 'Half Chicken Karahi'],
  ['Curry Dishes', 'Full Chicken Karahi'],

  // Rice Dishes
  ['Rice Dishes', 'Plain Rice'],
  ['Rice Dishes', 'Vegetable Biryani'],
  ['Rice Dishes', 'Chicken Biryani'],
  ['Rice Dishes', 'Boneless Chicken Biryani'],
  ['Rice Dishes', 'Veal Biryani'],
  ['Rice Dishes', 'Lamb / Goat Biryani'],
  ['Rice Dishes', 'Shrimp Biryani'],
  ['Rice Dishes', 'Fish Biryani'],

  // Wraps
  ['Wraps', 'Chicken Kebab Roll'],
  ['Wraps', 'Beef Kebab Roll'],
  ['Wraps', 'Chicken Tikka Roll'],
  ['Wraps', 'Bihari Kabob Roll'],

  // Sizzling B.B.Q (Tandoori)
  ['Sizzling B.B.Q (Tandoori)', 'Chicken or Beef Kabob (1 pc)'],
  ['Sizzling B.B.Q (Tandoori)', 'Quarter Chicken Leg only'],
  ['Sizzling B.B.Q (Tandoori)', 'Quarter Chicken Leg with Naan'],
  ['Sizzling B.B.Q (Tandoori)', 'Tandoori Chicken Full with Rice or Naans'],
  ['Sizzling B.B.Q (Tandoori)', 'Tandoori Chicken Half with Rice or Naan'],
  ['Sizzling B.B.Q (Tandoori)', 'Chicken Tikka White Meat'],
  ['Sizzling B.B.Q (Tandoori)', 'Chicken Tikka Dark Meat'],
  ['Sizzling B.B.Q (Tandoori)', 'Chicken Kabab / Rice or Naan'],
  ['Sizzling B.B.Q (Tandoori)', 'Seekh Kabab / Rice or Naan'],
  ['Sizzling B.B.Q (Tandoori)', 'Chapli Kabab / Rice or Naan'],
  ['Sizzling B.B.Q (Tandoori)', 'Bihari Kabab'],
  ['Sizzling B.B.Q (Tandoori)', 'Lamb Chops'],

  // Sea Food
  ['Sea Food', 'Fried Fish'],
  ['Sea Food', 'Fish Tandoori'],
  ['Sea Food', 'Shrimp Curry'],
  ['Sea Food', 'Fish Curry'],
  ['Sea Food', 'Fish Masala'],
  ['Sea Food', 'Prawn Masala'],
  ['Sea Food', 'Prawn Curry'],

  // Naan (Bread)
  ['Naan (Bread)', 'Plain Naan'],
  ['Naan (Bread)', 'Garlic Naan'],
  ['Naan (Bread)', 'Onion Naan'],
  ['Naan (Bread)', 'Aloo Naan'],
  ['Naan (Bread)', 'Qeema Naan'],
  ['Naan (Bread)', 'Sesame (Till) Naan'],
  ['Naan (Bread)', 'Afghani Naan (catering)'],
  ['Naan (Bread)', 'Tandoori Naan (catering)'],

  // Dessert & Sweets
  ['Dessert & Sweets', 'Rasmalai (2 pcs)'],
  ['Dessert & Sweets', 'Gulab Jaman (2 Pcs)'],
  ['Dessert & Sweets', 'Kheer'],
  ['Dessert & Sweets', 'Mixed Sweets (per lb)'],
  ['Dessert & Sweets', 'Laddu (per lb)'],
  ['Dessert & Sweets', 'Carrot Halwa (catering)'],
  ['Dessert & Sweets', 'Mango Delight (catering)'],
  ['Dessert & Sweets', 'Pineapple Delight (catering)'],
  ['Dessert & Sweets', 'Zarda (catering)'],

  // Hot & Cold Beverages
  ['Hot & Cold Beverages', 'Lassi Sweet or Salty'],
  ['Hot & Cold Beverages', 'Mango Lassi'],
  ['Hot & Cold Beverages', 'Kulfi Mango / Pista'],
  ['Hot & Cold Beverages', 'Mango Shake'],
  ['Hot & Cold Beverages', 'Mango Juice'],
  ['Hot & Cold Beverages', 'Soda Can'],
  ['Hot & Cold Beverages', 'Tea'],
  ['Hot & Cold Beverages', 'Masala Tea'],

  // Kid's Menu
  ["Kid's Menu", 'Chicken Nuggets with French Fries'],
  ["Kid's Menu", 'Malai Chicken Tikka (4/5 pcs) with French Fries'],
  ["Kid's Menu", 'Kids French Fries'],

  // Catering-only items (unique, not on dine-in/takeout)
  ['Catering (extras)', 'Vegetable Pulao'],
  ['Catering (extras)', 'Chicken Pulao'],
  ['Catering (extras)', 'Veal Pulao'],
  ['Catering (extras)', 'Achar Chicken'],
  ['Catering (extras)', 'Finger Fish'],
  ['Catering (extras)', 'Yogurt Sauce with Herbs (Raita)'],
  ["Catering (extras)", "Chef's Garden Salad"],
];

// Catering packages — list prices sourced from src/data/cateringPackages.ts
const CATERING_PACKAGES = [
  // [name, min_people, items_count, list_price_per_person]
  ['Basic Package',      30,  7, 10.49],
  ['Vegetarian Package', 30,  8, 10.49],
  ['Silver Package',     30,  8, 12.49],
  ['Gold Package',       30,  9, 14.49],
  ['Platinum Package',   25, 11, 16.49],
];

// ─── Styling helpers ───────────────────────────────────────────────────
const HEADER_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F2937' } };
const CATEGORY_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEEF2FF' } };
const TOTAL_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
const PRICE_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } };
const RED_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEE2E2' } };
const BORDER = {
  top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
  left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
  bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
  right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
};
const MONEY = '"$"#,##0.00';
const PCT = '0"%"';

function styleHeaderRow(row) {
  row.eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = { color: { argb: 'FFFFFFFF' }, bold: true, size: 11 };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = BORDER;
  });
  row.height = 32;
}

function buildInstructions(ws) {
  ws.columns = [{ width: 110 }];
  const rows = [
    ['Food Time — Cost & Inventory Template', 16, true],
    ['', 11, false],
    ['How to use this workbook', 13, true],
    ['', 11, false],
    ['1. Open the "Menu Costs" tab.', 11, false],
    ['2. For every row, fill in:', 11, false],
    ['     • Cost of Meat (column C)', 11, false],
    ['     • Cost of Vegetables (column D)', 11, false],
    ['     • Cost of Spices (column E)', 11, false],
    ['     • Cost of Labour (column F)', 11, false],
    ['     • Cost of Packaging (column G)', 11, false],
    ['     • Markup %  (column H) — whole number, e.g. 35 for 35%', 11, false],
    ['3. "Final Price" (column I) is auto-calculated:', 11, false],
    ['     Final Price = (C + D + E + F + G) × (1 + Markup% / 100)', 11, false],
    ['4. The "Totals" row at the bottom sums every cost column.', 11, false],
    ['5. Markup below 10% highlights red as a visual warning.', 11, false],
    ['', 11, false],
    ['The "Catering" tab computes gross margin per person instead of final price — list prices are already filled in from src/data/cateringPackages.ts.', 11, false],
    ['', 11, false],
    ['Regenerating this file', 13, true],
    ['Run:  node generate-cost-template.mjs   (or:  npm run gen:costs)', 11, false],
    ['The generator reads the hard-coded menu list inside the script. Keep it in sync with src/data/menu.ts.', 11, false],
  ];
  rows.forEach(([text, size, bold], i) => {
    const r = ws.getRow(i + 1);
    r.getCell(1).value = text;
    r.getCell(1).font = { size, bold };
    r.getCell(1).alignment = { vertical: 'middle', wrapText: true };
  });
}

function buildMenuCosts(ws) {
  ws.columns = [
    { header: 'Category',            width: 28 },
    { header: 'Item',                width: 48 },
    { header: 'Cost of Meat',        width: 14 },
    { header: 'Cost of Vegetables',  width: 18 },
    { header: 'Cost of Spices',      width: 14 },
    { header: 'Cost of Labour',      width: 14 },
    { header: 'Cost of Packaging',   width: 18 },
    { header: 'Markup %',            width: 12 },
    { header: 'Final Price',         width: 16 },
  ];
  styleHeaderRow(ws.getRow(1));
  ws.views = [{ state: 'frozen', xSplit: 2, ySplit: 1 }];

  MENU_ROWS.forEach(([category, item], idx) => {
    const rowIdx = idx + 2; // 1 is header
    const row = ws.getRow(rowIdx);
    row.getCell(1).value = category;
    row.getCell(1).fill = CATEGORY_FILL;
    row.getCell(1).font = { bold: true, color: { argb: 'FF3730A3' }, size: 11 };
    row.getCell(1).border = BORDER;

    row.getCell(2).value = item;
    row.getCell(2).border = BORDER;

    for (let c = 3; c <= 7; c++) {
      const cell = row.getCell(c);
      cell.numFmt = MONEY;
      cell.border = BORDER;
      cell.alignment = { horizontal: 'right' };
    }
    const mk = row.getCell(8);
    mk.numFmt = PCT;
    mk.border = BORDER;
    mk.alignment = { horizontal: 'right' };

    const fp = row.getCell(9);
    fp.value = {
      formula:
        `IF(COUNT(C${rowIdx}:G${rowIdx})=0,"",` +
        `ROUND(SUM(C${rowIdx}:G${rowIdx})*(1+IFERROR(H${rowIdx},0)/100),2))`,
    };
    fp.numFmt = MONEY;
    fp.font = { bold: true };
    fp.fill = PRICE_FILL;
    fp.border = BORDER;
    fp.alignment = { horizontal: 'right' };
  });

  // Totals row
  const lastData = MENU_ROWS.length + 1;      // last data row index (1-based)
  const totalsRow = lastData + 2;
  const tr = ws.getRow(totalsRow);
  tr.getCell(2).value = 'Totals';
  tr.getCell(2).font = { bold: true, size: 11 };

  for (let c = 3; c <= 7; c++) {
    const col = String.fromCharCode(64 + c); // C..G
    const cell = tr.getCell(c);
    cell.value = { formula: `IFERROR(SUM(${col}2:${col}${lastData}),0)` };
    cell.numFmt = MONEY;
    cell.font = { bold: true };
    cell.fill = TOTAL_FILL;
    cell.border = BORDER;
  }
  const tFp = tr.getCell(9);
  tFp.value = { formula: `IFERROR(SUM(I2:I${lastData}),0)` };
  tFp.numFmt = MONEY;
  tFp.font = { bold: true };
  tFp.fill = TOTAL_FILL;
  tFp.border = BORDER;

  // Conditional formatting — markup < 10% turns red
  ws.addConditionalFormatting({
    ref: `H2:H${lastData}`,
    rules: [
      {
        type: 'expression',
        formulae: [`AND(ISNUMBER(H2),H2<10)`],
        style: { fill: RED_FILL },
      },
    ],
  });
}

function buildCatering(ws) {
  ws.columns = [
    { header: 'Package',                        width: 22 },
    { header: 'Min People',                     width: 12 },
    { header: '# Items',                        width: 10 },
    { header: 'List Price / Person',            width: 18 },
    { header: 'Cost of Meat / Person',          width: 20 },
    { header: 'Cost of Vegetables / Person',    width: 22 },
    { header: 'Cost of Spices / Person',        width: 20 },
    { header: 'Cost of Labour / Person',        width: 20 },
    { header: 'Cost of Packaging / Person',     width: 22 },
    { header: 'Total Cost / Person',            width: 20 },
    { header: 'Gross Margin / Person',          width: 22 },
    { header: 'Gross Margin %',                 width: 16 },
  ];
  styleHeaderRow(ws.getRow(1));
  ws.getRow(1).height = 44;
  ws.views = [{ state: 'frozen', xSplit: 1, ySplit: 1 }];

  CATERING_PACKAGES.forEach(([pkg, minPeople, itemsCount, listPrice], idx) => {
    const rowIdx = idx + 2;
    const row = ws.getRow(rowIdx);
    row.getCell(1).value = pkg;
    row.getCell(1).font = { bold: true };
    row.getCell(2).value = minPeople;
    row.getCell(3).value = itemsCount;
    row.getCell(4).value = listPrice;
    row.getCell(4).numFmt = MONEY;

    for (let c = 5; c <= 9; c++) {
      row.getCell(c).numFmt = MONEY;
    }
    const totalCost = row.getCell(10);
    totalCost.value = { formula: `IF(COUNT(E${rowIdx}:I${rowIdx})=0,"",SUM(E${rowIdx}:I${rowIdx}))` };
    totalCost.numFmt = MONEY;
    totalCost.font = { bold: true };
    totalCost.fill = PRICE_FILL;

    const margin = row.getCell(11);
    margin.value = { formula: `IF(J${rowIdx}="","",D${rowIdx}-J${rowIdx})` };
    margin.numFmt = MONEY;
    margin.font = { bold: true };

    const pct = row.getCell(12);
    pct.value = { formula: `IF(OR(J${rowIdx}="",D${rowIdx}=0),"",ROUND((D${rowIdx}-J${rowIdx})/D${rowIdx}*100,1))` };
    pct.numFmt = PCT;
    pct.font = { bold: true };

    for (let c = 1; c <= 12; c++) row.getCell(c).border = BORDER;
  });
}

async function main() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Food Time';
  wb.created = new Date();

  buildInstructions(wb.addWorksheet('Instructions'));
  buildMenuCosts(wb.addWorksheet('Menu Costs'));
  buildCatering(wb.addWorksheet('Catering'));

  await wb.xlsx.writeFile(OUT);
  const { size } = fs.statSync(OUT);
  console.log(`Wrote ${OUT}  (${MENU_ROWS.length} menu items, ${CATERING_PACKAGES.length} catering packages, ${Math.round(size / 1024)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
