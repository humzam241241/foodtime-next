import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, BorderStyle, WidthType, ShadingType, AlignmentType,
  PageOrientation, PageBreak } from 'docx';
import fs from 'fs';

const RED = "C62828";
const LIGHT_RED = "FBE9E7";
const LIGHT_GRAY = "F5F5F5";
const YELLOW_BG = "FFF9C4";
const border = { style: BorderStyle.SINGLE, size: 1, color: "999999" };
const borders = { top: border, bottom: border, left: border, right: border };

// Landscape US Letter: content width = 15840 - 2*1080 = 13680 (with 0.75" margins)
const PAGE_W = 12240;
const PAGE_H = 15840;
const MARGIN = 1080;
const CW = PAGE_H - 2 * MARGIN; // 13680

function hdr(text, level = HeadingLevel.HEADING_2) {
  return new Paragraph({ heading: level, spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, font: "Arial", color: RED,
      size: level === HeadingLevel.HEADING_1 ? 36 : level === HeadingLevel.HEADING_2 ? 28 : 24 })] });
}

function note(text) {
  return new Paragraph({ spacing: { after: 100 },
    children: [new TextRun({ text, italics: true, font: "Arial", size: 20, color: "666666" })] });
}

function cell(text, opts = {}) {
  const { bold, bg, align, width } = opts;
  return new TableCell({
    borders, width: width ? { size: width, type: WidthType.DXA } : undefined,
    shading: bg ? { fill: bg, type: ShadingType.CLEAR } : undefined,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: [new Paragraph({
      alignment: align || AlignmentType.LEFT,
      children: [new TextRun({ text: text || "", font: "Arial", size: 18, bold: !!bold })]
    })]
  });
}

function headerRow(labels, widths, bg = RED) {
  return new TableRow({
    children: labels.map((l, i) => new TableCell({
      borders, width: { size: widths[i], type: WidthType.DXA },
      shading: { fill: bg, type: ShadingType.CLEAR },
      margins: { top: 60, bottom: 60, left: 80, right: 80 },
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: l, font: "Arial", size: 18, bold: true, color: "FFFFFF" })]
      })]
    }))
  });
}

function dataRow(vals, widths, rowIdx) {
  const bg = rowIdx % 2 === 1 ? LIGHT_GRAY : undefined;
  return new TableRow({
    children: vals.map((v, i) => {
      const isNewPrice = typeof v === 'object' && v.newPrice;
      return cell(isNewPrice ? "" : (v || ""), {
        width: widths[i], bg: isNewPrice ? YELLOW_BG : bg,
        align: i >= 2 ? AlignmentType.CENTER : undefined
      });
    })
  });
}

// ========== SECTION 1: FULL MENU ==========
const menuData = [
  { name: "Appetizers / Snacks", items: [
    ["Shami Kabab (2 Pcs.)", "Pan fried patties with spicy minced beef made with lentils and herbs", "$5.99", "$5.49"],
    ["Chat Papri", "Chickpeas, crunchy wafer and potatoes topped with yogurt and sweet tamarind sauce", "$7.99", "$7.49"],
    ["Aloo Channa Chaat", "Chickpeas and potatoes mixed in chaat masala and topped with yogurt and sweet tamarind sauce", "$7.49", "$6.99"],
    ["Veggie Pakoras (6 Pcs.)", "Fried with Potatoes, Onion and Gram Flour", "$5.99", "$4.99"],
    ["Chicken Pakoras (6 Pcs.)", "", "$9.99", "$8.99"],
    ["Vegetable Samosa", "Spicy Potatoes wrapped in a special triangular bread piece", "$1.99", "$1.49/pc"],
  ]},
  { name: "Vegetarian Dishes", items: [
    ["Pakora Curry", "Thick curry sauce made with yogurt", "$8.99", "$7.99"],
    ["Mash/Shahi Daal", "Spicy lentil curry garnished with fried onions and herbs", "$8.99", "$7.99"],
    ["Mixed Vegetables", "Assorted veggies cooked with herbs and spices", "$8.99", "$7.99"],
    ["Channa Masala", "", "$8.99", "$7.99"],
    ["Palak Aloo", "Spinach and potatoes", "$8.99", "$7.99"],
    ["Mutter Aloo", "Peas and potatoes", "$8.99", "$7.99"],
    ["Palak Paneer", "Spinach and cheese", "$8.99", "$8.49"],
    ["Mutter Paneer", "Cubed cheese with peas in creamy sauce", "$8.99", "$8.49"],
    ["Paneer Makhani", "Home-made cheese cubes cooked in butter sauce, herbs and spices", "$8.99", "$8.49"],
    ["Baighan", "Eggplant cooked with herbs and spices", "$8.99", "$7.99"],
  ]},
  { name: "Curry Dishes", items: [
    ["Qorma \u2014 Chicken", "Thick spicy gravy with yogurt, sliced ginger and fried onions", "$9.99", "$9.49"],
    ["Qorma \u2014 Chicken boneless", "", "$11.99", "$11.49"],
    ["Qorma \u2014 Veal", "", "$11.99", "$11.49"],
    ["Qorma \u2014 Lamb/Goat", "", "$14.99", "$13.49"],
    ["Karahi \u2014 Chicken", "Thick sauce made out of tomatoes and spices, garnished with green chilli, coriander and sliced ginger", "$10.99", "$10.49"],
    ["Karahi \u2014 Chicken boneless", "", "$12.99", "$12.49"],
    ["Karahi \u2014 Veal", "", "$12.99", "$12.49"],
    ["Karahi \u2014 Goat", "", "$15.99", "$14.49"],
    ["Palak Gosht \u2014 Chicken", "Meat cooked with spinach and various spices", "$11.99", "$11.99"],
    ["Palak Gosht \u2014 Chicken Boneless", "", "$13.99", "$12.99"],
    ["Palak Gosht \u2014 Veal", "", "$13.99", "$12.99"],
    ["Palak Gosht \u2014 Lamb/Goat", "", "$15.99", "$14.99"],
    ["Daal Gosht \u2014 Chicken", "Meat cooked with Mash/Shahi daal and various spices", "$12.99", "\u2014"],
    ["Daal Gosht \u2014 Chicken Boneless", "", "$14.99", "$13.99"],
    ["Daal Gosht \u2014 Veal", "", "$14.99", "$13.99"],
    ["Vindaloo \u2014 Chicken", "Meat simmered with potatoes in a sour & tangy sauce", "$11.99", "$11.49"],
    ["Vindaloo \u2014 Chicken Boneless", "", "$13.99", "$13.49"],
    ["Vindaloo \u2014 Veal", "", "$13.99", "$13.49"],
    ["Chicken Jalfrazi", "Boneless chicken curry with tomatoes, onions and green peppers", "$13.99", "$12.99"],
    ["Chicken Chilli", "Boneless chicken with chillies and tomatoes", "$13.49", "$12.49"],
    ["Butter Chicken", "Boneless chicken marinated in spices and cooked with tomato sauce, butter and cream", "$13.99", "$12.99"],
    ["Chicken Tikka Masala", "Marinated tandoori chicken in curry sauce", "$13.99", "$12.99"],
    ["Nahari", "Chunks of shank meat in thick curry sauce garnished with sliced ginger, lime and herbs", "$12.99", "$12.99"],
    ["Paya", "Cow feet cooked in curry sauce, garnished with sliced ginger, lime & herbs", "$12.99", "$12.99"],
    ["Haleem", "Beef, lentils and whole wheat cooked together, garnished with sliced ginger, fried onions, lime & herbs", "$12.99", "$12.99"],
    ["Half Chicken Karahi", "Freshly cooked chicken with spices, garnished with sliced ginger, fried onion, lime and herbs", "$24.99", "$23.99"],
    ["Full Chicken Karahi", "", "$38.99", "$37.99"],
  ]},
  { name: "Rice Dishes", items: [
    ["Plain Rice", "", "$3.99", "$3.49"],
    ["Vegetable Biryani", "Rice cooked in special spices and herbs, served with raita", "$10.99", "$10.49"],
    ["Chicken Biryani", "", "$11.99", "$11.99"],
    ["Boneless Chicken Biryani", "", "$11.99", "$11.99"],
    ["Veal Biryani", "", "$11.99", "$11.99"],
    ["Lamb/Goat Biryani", "", "$15.49", "$13.99"],
    ["Shrimp Biryani", "", "$15.49", "$13.99"],
    ["Fish Biryani", "", "$15.49", "$13.99"],
  ]},
  { name: "Wraps", items: [
    ["Chicken Kebab Roll", "Minced meat wrapped in naan with chutney and salad", "$6.99", "$6.49"],
    ["Beef Kebab Roll", "", "$6.99", "$6.49"],
    ["Chicken Tikka Roll", "Rolled in naan with chutney and salad", "$6.99", "$6.49"],
    ["Bihari Kabob Roll", "", "$6.99", "$6.49"],
  ]},
  { name: "Sizzling B.B.Q (Tandoori Dishes)", note: "All Tandoori dishes come with Naan", items: [
    ["Chicken or Beef Kabob (1 pc)", "No naan/rice", "$4.99", "$4.49"],
    ["Quarter Chicken Leg only", "No naan/rice", "$5.99", "$5.99"],
    ["Quarter Chicken Leg with Naan", "Marinated in Pakistani spices and cooked in clay oven", "$8.49", "$7.99"],
    ["Tandoori Chicken Full with Rice or Naans", "", "$28.99", "$26.49"],
    ["Tandoori Chicken Half with Rice or Naan", "", "$15.99", "$14.49"],
    ["Chicken Tikka White Meat", "Boneless chicken pieces marinated in spices and cooked in clay oven served with chutney", "$14.49", "$13.49"],
    ["Chicken Tikka Dark Meat", "", "$12.49", "$11.49"],
    ["Chicken Kabab / Rice or Naan", "Minced Chicken (2 pc) marinated in spices", "$11.99", "$11.49"],
    ["Seekh Kabab / Rice or Naan", "Minced Beef (2 pcs) marinated in spices", "$11.99", "$11.49"],
    ["Chapli Kabab / Rice or Naan", "Spicy minced patties (2 pcs) in fry pan", "$11.99", "$11.49"],
    ["Bihari Kabab", "Thin slices of beef marinated with spices and herbs cooked in clay oven", "$14.99", "$14.99"],
    ["Lamb Chops", "Marinated spicy ribs cooked in clay oven", "$17.99", "$16.99"],
  ]},
  { name: "Sea Food", items: [
    ["Fried Fish", "", "$12.99", "$12.49"],
    ["Fish Tandoori", "", "$12.99", "$12.49"],
    ["Shrimp Curry", "Shrimp cooked in thick gravy", "$12.99", "$12.49"],
    ["Fish Curry", "Fish cooked in curry sauce", "$12.99", "$12.49"],
    ["Fish Masala", "Deboned fish cooked with tomatoes, green peppers, onions, mild spice and dressed with coriander leaves", "$12.99", "$12.49"],
    ["Prawn Masala", "Prawn cooked in fresh Onion, Green peppers with mildly spiced gravy", "$12.99", "$12.49"],
    ["Prawn Curry", "Prawn cooked with mildly spiced gravy", "$12.99", "$12.49"],
  ]},
  { name: "Naan (Bread)", items: [
    ["Plain Naan", "Round white flour bread (with butter extra 0.25 cents)", "$2.49", "$1.99"],
    ["Garlic Naan", "Bread stuffed with garlic", "$3.49", "$2.99"],
    ["Onion Naan", "", "$4.99", "$4.49"],
    ["Aloo Naan", "Bread stuffed with potatoes", "$4.99", "$4.49"],
    ["Qeema Naan", "Bread stuffed with ground beef", "$4.99", "$4.49"],
    ["Sesame (Till) Naan", "", "$4.99", "$4.49"],
  ]},
  { name: "Dessert & Sweets", items: [
    ["Rasmalai", "2 pieces", "$3.99", "$3.99"],
    ["Gulab Jaman (2 Pcs)", "", "$3.99", "$3.99"],
    ["Kheer", "Rice pudding", "$3.99", "$3.99"],
    ["Mixed Sweets", "", "$11.99/lb", "$11.99/lb"],
    ["Laddu", "", "$9.99/lb", "$9.99/lb"],
  ]},
  { name: "Hot & Cold Beverages", items: [
    ["Lassi Sweet or Salty", "Chilled drink mixed with milk and yogurt", "$2.99", "$2.49"],
    ["Mango Lassi", "", "$2.99", "$2.49"],
    ["Kulfi Mango / Pista", "", "$2.99", "$2.99"],
    ["Mango Shake", "", "$2.99", "$2.49"],
    ["Mango Juice", "", "$2.99", "$2.49"],
    ["Soda Can", "", "$1.99", "$1.49"],
    ["Tea", "", "$2.49", "$2.49"],
    ["Masala Tea", "", "$2.99", "$2.99"],
  ]},
];

// 6 cols: Item, Desc, DineIn, NewDineIn, Takeout, NewTakeout
const menuW = [2600, 3880, 1300, 1300, 1300, 1300]; // sum = 13680
const menuHeaders = ["Item", "Description", "Dine-In", "New Dine-In", "Takeout", "New Takeout"];

function menuTable(cat) {
  const rows = [headerRow(menuHeaders, menuW)];
  cat.items.forEach((item, i) => {
    rows.push(dataRow([item[0], item[1], item[2], {newPrice:true}, item[3], {newPrice:true}], menuW, i));
  });
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: menuW, rows });
}

// ========== SECTION 2: COMBOS ==========
// Dine-in combos for >1
const dineInCombos = [
  ["BUTTER CHICKEN SPECIAL", "2 Naan or Rice, 1 Pop", "$15.99"],
  ["VEGETABLE THALI", "Vegetable Biryani, Mixed Vegetable, Chana Masala, Salad, Raita, Dessert & Pop", "$14.99"],
  ["MEAT THALI", "Chicken Biryani, Chicken Qorma, Vegetable of the day, Salad, Raita, Dessert & Pop", "$14.99"],
  ["MEAT COMBO FOR 2", "1 Choice of any chicken or veal curry dish, 1 Chicken or Veal Biryani, 2 Pcs chicken or beef Seekh Kebab or 1/4 chicken leg, 2 Naans, Salad and Chutney/Raita, 2 Cans of Pop", "$32.99"],
  ["VEGGIE COMBO FOR 2", "2 Samosas, 1 Vegetable Biryani, 1 Mutter Paneer or Palak Paneer, 1 Channa Masala or Daal, 2 Naans, Salad, Chutney/Raita", "$27.99"],
  ["FAMILY COMBO FOR 4 (Wed Special 10% OFF)", "1 Choice of any chicken curry dish, 1 Choice of any veal/beef curry dish, 4 Pcs Chicken or Beef seekh kebab or Two 1/4 Chk legs, 2 Chicken Biryani, 4 Naans, Salad & Chutney/Raita, 4 Cans of Pop", "$64.99"],
  ["BBQ PLATTER FOR 4 (Thu Special 10% OFF)", "5/6 Pcs Chicken Tikka (white or dark meat), 1/4 Chicken leg (one order), 4 pcs Chicken or Beef Seekh Kebab, 6 pcs Bihari Kabab, 2 Biryani Rice, 4 Naans, Salad, Raita & 4 pops", "$59.99"],
  ["BBQ Platter for 2", "Half of BBQ Platter for 4", "$31.99"],
];

const takeoutCombos = [
  ["BUTTER CHICKEN SPECIAL", "2 Naan or Rice, 1 Pop", "$15.99"],
  ["MEAT COMBO FOR 2", "1 Choice of any chicken or veal curry dish, 1 Chicken or Veal Biryani, 2 Pcs chicken or beef Seekh Kebab or 1/4 chicken leg, 2 Naans, Salad and Chutney/Raita, 2 Cans of Pop", "$31.99"],
  ["VEGGIE COMBO FOR 2", "2 Samosas, 1 Vegetable Biryani, 1 Mutter Paneer or Palak Paneer, 1 Channa Masala or Daal, 2 Naans, Salad, Chutney/Raita", "$25.99"],
  ["FAMILY COMBO FOR 4 (Wed Special 10% OFF)", "1 Choice of any chicken curry dish, 1 Choice of any veal/beef curry dish, 4 Pcs Chicken or Beef seekh kebab or Two 1/4 Chk legs, 2 Chicken Biryani, 4 Naans, Salad & Chutney/Raita, 4 Cans of Pop", "$59.99"],
  ["BBQ PLATTER FOR 4 (Thu Special 10% OFF)", "5/6 Pcs Chicken Tikka (white or dark meat), 1/4 Chicken leg (one order), 4 pcs Chicken or Beef Seekh Kebab, 6 pcs Bihari Kabab, 2 Biryani Rice, 4 Naans, Salad, Raita & 4 pops", "$54.99"],
  ["BBQ Platter for 2", "Half of BBQ Platter for 4", "$29.99"],
];

const singleCombos = [
  ["Bihari Kabab with Rice & Naan", "Salad, Raita or Chutney, Pop", "$16.49"],
  ["Beef Seekh Kabab with Rice & Naan", "Salad, Raita or Chutney & Pop", "$16.49"],
  ["Chicken Tikka with Rice & Naan", "Salad, Raita or Chutney, Pop (Add $2 for white meat)", "$16.49"],
  ["Chicken Kabab with Rice & Naan", "", "$16.49"],
  ["1/4 Chicken Leg with Rice & Naan", "", "$10.99"],
  ["Lamb Chop with Rice & Naan", "", "$19.99"],
  ["Tandoori Fish with Rice & Naan", "", "$16.49"],
  ["Chicken Curry Combo", "Any chicken curry with Rice, 1 Naan, Salad & Pop", "$14.99"],
  ["Beef/Veal Curry Combo", "Any beef/veal curry with Rice, 1 Naan, Salad & Pop", "$14.99"],
  ["Butter Chicken Special", "2 Naans or Rice & 1 Pop", "$15.99"],
];

// 4 cols: Combo, Items, Price, NewPrice
const comboW = [3200, 6880, 1800, 1800]; // sum=13680
const comboHeaders = ["Combo", "Items Included", "Price", "New Price"];

function comboTable(data) {
  const rows = [headerRow(comboHeaders, comboW)];
  data.forEach((item, i) => {
    rows.push(dataRow([item[0], item[1], item[2], {newPrice:true}], comboW, i));
  });
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: comboW, rows });
}

// ========== SECTION 3: DAILY SPECIALS ==========
const dailySpecials = [
  ["Tuesday", "Chicken Biryani", "$7.49"],
  ["Tuesday", "Beef Qorma + Naan", "$9.99"],
  ["Tuesday", "Seekh Kabab Roll", "$6.49"],
  ["Wednesday", "Chicken Kabab Roll", "$6.49"],
  ["Wednesday", "Veal Palou", "$9.49"],
  ["Wednesday", "Chicken Qorma + Naan", "$8.49"],
  ["Thursday", "Veal Biryani", "$9.49"],
  ["Thursday", "1/4 Chicken Leg + Naan", "$6.99"],
  ["Thursday", "Chicken Karahi + Naan", "$9.99"],
  ["Friday", "Butter Chicken", "$10.99"],
  ["Friday", "Mash / Shahi Daal", "$7.99"],
  ["Friday", "Chicken Tikka Roll", "$6.49"],
  ["Saturday", "Nihari + Naan", "$11.99"],
  ["Saturday", "Channa Masala", "$7.99"],
  ["Sunday", "Haleem + Rice / Naan", "$11.99"],
  ["Sunday", "Vegetable Biryani", "$7.99"],
];

const dailyW = [3000, 5080, 2800, 2800]; // sum=13680
const dailyHeaders = ["Day", "Item", "Price", "New Price"];

function dailyTable() {
  const rows = [headerRow(dailyHeaders, dailyW)];
  dailySpecials.forEach((item, i) => {
    rows.push(dataRow([item[0], item[1], item[2], {newPrice:true}], dailyW, i));
  });
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: dailyW, rows });
}

// ========== SECTION 4: PARTY TRAYS ==========
const trayData = [
  { name: "Biryani Trays", headers: ["Item","Small (5-8)","New Small","Medium (10-15)","New Med","Large (20-25)","New Large"], rows: [
    ["Biryani Rice","$35","","$45","","$75",""],["Chicken","$40","","$60","","$95",""],["Veal","$55","","$80","","$125",""],["Goat","$70","","$100","","$150",""],["Vegetable","$35","","$45","","$75",""],["Shrimp","$55","","$80","","$125",""],
  ]},
  { name: "BBQ Items", headers: ["Item","Small","New Small","Medium","New Med","Large","New Large"], rows: [
    ["Chicken/Beef Kabobs","$75 (15 pcs)","","$120 (25 pcs)","","$165 (35 pcs)",""],["Tandoori Chicken","$55 (10 legs)","","$85 (15 legs)","","$115 (20 legs)",""],["Chicken Tikka Boneless Dark","$75 (40 pcs)","","$115 (60 pcs)","","$150 (80 pcs)",""],
  ]},
  { name: "Chicken Curries", headers: ["Item","Small (10-12)","New Small","Medium (13-20)","New Med","Large (21-35)","New Large"], rows: [
    ["Chicken Karahi","$65","","$95","","$145",""],["Chicken Qorma","$65","","$95","","$145",""],["Butter Chicken","$65","","$95","","$135",""],["Chilli Chicken","$65","","$120","","$160",""],["Chicken Jalfrazi","$65","","$120","","$160",""],["Chicken Tikka Masala","$65","","$120","","$160",""],
  ]},
  { name: "Veal Curries", headers: ["Item","Small","New Small","Medium","New Med","Large","New Large"], rows: [
    ["Veal Karahi","$65","","$110","","$150",""],["Veal Qorma","$65","","$110","","$150",""],["Beef Nahari","$65","","$110","","$150",""],
  ]},
  { name: "Goat Curries", headers: ["Item","Small","New Small","Medium","New Med","Large","New Large"], rows: [
    ["Goat Karahi","$95","","$150","","$175",""],["Goat Qorma","$95","","$150","","$165",""],
  ]},
  { name: "Other Trays", headers: ["Item","Small","New Small","Medium","New Med","Large","New Large"], rows: [
    ["Mix Veg","$50","","$90","","$120",""],["Chana Masala","$50","","$90","","$120",""],["Mash/Shahi Daal","$50","","$90","","$120",""],["Fish Curry","$65","","$110","","$150",""],["Shrimp Curry","$65","","$110","","$150",""],["Haleem","$65","","$110","","$150",""],
  ]},
  { name: "Sweets Trays", headers: ["Item","Small","New Small","Medium","New Med","Large","New Large"], rows: [
    ["Kheer","$50","","$90","","$120",""],["Carrot Halwa","$50","","$90","","$120",""],
  ]},
];

// 7 cols for trays
const trayW = [3080, 1800, 1600, 1800, 1600, 1800, 1600]; // sum=13280... need 13680
// Recalc: 3280 + 6*1733 = 3280+10398 = nah. Let me do: 3480, 1700, 1700, 1700, 1700, 1700, 1700 = 13680
const trayColW = [3480, 1700, 1700, 1700, 1700, 1700, 1700];

function trayTable(cat) {
  const rows = [headerRow(cat.headers, trayColW)];
  cat.rows.forEach((row, i) => {
    const bg = i % 2 === 1 ? LIGHT_GRAY : undefined;
    rows.push(new TableRow({
      children: row.map((v, ci) => {
        const isNew = ci === 2 || ci === 4 || ci === 6;
        return cell(v, { width: trayColW[ci], bg: isNew ? YELLOW_BG : bg, align: ci >= 1 ? AlignmentType.CENTER : undefined });
      })
    }));
  });
  return new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: trayColW, rows });
}

// ========== BUILD DOCUMENT ==========
const children = [];

// Title
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
  children: [new TextRun({ text: "Food Time Restaurant", font: "Arial", size: 44, bold: true, color: RED })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
  children: [new TextRun({ text: "Menu & Pricing Review", font: "Arial", size: 32, color: "444444" })] }));
children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 300 },
  children: [new TextRun({ text: "Yellow columns are for writing in new prices. Print this out or edit digitally.", font: "Arial", size: 20, italics: true, color: "888888" })] }));

// Section 1
children.push(hdr("Section 1: Full Menu (Dine-In vs Takeout)", HeadingLevel.HEADING_1));
for (const cat of menuData) {
  children.push(hdr(cat.name, HeadingLevel.HEADING_3));
  if (cat.note) children.push(note(cat.note));
  children.push(menuTable(cat));
  children.push(new Paragraph({ spacing: { after: 200 }, children: [] }));
}

// Page break
children.push(new Paragraph({ children: [new PageBreak()] }));

// Section 2
children.push(hdr("Section 2: Combo Deals", HeadingLevel.HEADING_1));
children.push(hdr("Dine-In Combos (for more than 1)", HeadingLevel.HEADING_3));
children.push(comboTable(dineInCombos));
children.push(new Paragraph({ spacing: { after: 300 }, children: [] }));

children.push(hdr("Takeout Combos (for more than 1)", HeadingLevel.HEADING_3));
children.push(comboTable(takeoutCombos));
children.push(new Paragraph({ spacing: { after: 300 }, children: [] }));

children.push(hdr("Single Combos (same for Dine-In & Takeout)", HeadingLevel.HEADING_3));
children.push(comboTable(singleCombos));

// Page break
children.push(new Paragraph({ children: [new PageBreak()] }));

// Section 3
children.push(hdr("Section 3: Daily Specials (Takeout)", HeadingLevel.HEADING_1));
children.push(dailyTable());

children.push(new Paragraph({ spacing: { after: 200 }, children: [] }));
children.push(hdr("Weekend Breakfast Special", HeadingLevel.HEADING_3));
children.push(note("Saturday & Sunday: 10 AM \u2013 1 PM"));
const wkndW = [5000, 2000, 2000, 2340, 2340];
children.push(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: wkndW, rows: [
  headerRow(["Item", "Dine-In", "New Dine-In", "Takeout", "New Takeout"], wkndW),
  dataRow(["Halwa Puri (Puris, Halwa, Channa and Aloo Sabzi)", "$10.99", {newPrice:true}, "$8.99", {newPrice:true}], wkndW, 0),
]}));

// Page break
children.push(new Paragraph({ children: [new PageBreak()] }));

// Section 4
children.push(hdr("Section 4: Party Trays", HeadingLevel.HEADING_1));
for (const cat of trayData) {
  children.push(hdr(cat.name, HeadingLevel.HEADING_3));
  children.push(trayTable(cat));
  children.push(new Paragraph({ spacing: { after: 200 }, children: [] }));
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } },
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_W, height: PAGE_H, orientation: PageOrientation.LANDSCAPE },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
      }
    },
    children,
  }],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync("/Users/pc/Desktop/coding-projects/foodtime-next/FoodTime_Menu_Prices.docx", buffer);
console.log("Done! Document created at FoodTime_Menu_Prices.docx");
