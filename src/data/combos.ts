export type Combo = { name: string; price: string; items: string[] };
export type ComboSingle = { name: string; description?: string; price: string };

export const dineInCombos: Combo[] = [
  { name: 'BUTTER CHICKEN SPECIAL', price: '$15.99', items: ['2 Naan or Rice', '1 Pop'] },
  { name: 'VEGETABLE THALI', price: '$14.99', items: ['Vegetable Biryani', 'Mixed Vegetable', 'Chana Masala', 'Salad, Raita, Dessert & Pop'] },
  { name: 'MEAT THALI', price: '$14.99', items: ['Chicken Biryani', 'Chicken Qorma', 'Vegetable of the day', 'Salad, Raita, Dessert & Pop'] },
  { name: 'MEAT COMBO FOR 2', price: '$32.99', items: ['1 Choice of any chicken or veal curry dish', '1 Chicken or Veal Biryani', '2 Pcs chicken or beef Seekh Kebab or 1/4 chicken leg', '2 Naans, Salad and Chutney/Raita', '2 Cans of Pop'] },
  { name: 'VEGGIE COMBO FOR 2', price: '$27.99', items: ['2 Samosas', '1 Vegetable Biryani', '1 Mutter Paneer or Palak Paneer', '1 Channa Masala or Daal', '2 Naans, Salad, Chutney/Raita'] },
  { name: 'FAMILY COMBO FOR 4 (Wed Special 10% OFF)', price: '$64.99', items: ['1 Choice of any chicken curry dish', '1 Choice of any veal/beef curry dish', '4 Pcs Chicken or Beef seekh kebab or Two 1/4 Chk legs', '2 Chicken Biryani', '4 Naans, Salad & Chutney/Raita', '4 Cans of Pop'] },
  { name: 'BBQ PLATTER FOR 4 (Thu Special 10% OFF)', price: '$59.99', items: ['5/6 Pcs Chicken Tikka (white or dark meat)', '1/4 Chicken leg (one order)', '4 pcs Chicken or Beef Seekh Kebab', '6 pcs Bihari Kabab', '2 Biryani Rice', '4 Naans, Salad, Raita & 4 pops'] },
  { name: 'BBQ Platter for 2', price: '$31.99', items: ['Half of BBQ Platter for 4'] },
];

export const takeoutCombos: Combo[] = [
  { name: 'BUTTER CHICKEN SPECIAL', price: '$15.99', items: ['2 Naan or Rice', '1 Pop'] },
  { name: 'MEAT COMBO FOR 2', price: '$31.99', items: ['1 Choice of any chicken or veal curry dish', '1 Chicken or Veal Biryani', '2 Pcs chicken or beef Seekh Kebab or 1/4 chicken leg', '2 Naans, Salad and Chutney/Raita', '2 Cans of Pop'] },
  { name: 'VEGGIE COMBO FOR 2', price: '$25.99', items: ['2 Samosas', '1 Vegetable Biryani', '1 Mutter Paneer or Palak Paneer', '1 Channa Masala or Daal', '2 Naans, Salad, Chutney/Raita'] },
  { name: 'FAMILY COMBO FOR 4 (Wed Special 10% OFF)', price: '$59.99', items: ['1 Choice of any chicken curry dish', '1 Choice of any veal/beef curry dish', '4 Pcs Chicken or Beef seekh kebab or Two 1/4 Chk legs', '2 Chicken Biryani', '4 Naans, Salad & Chutney/Raita', '4 Cans of Pop'] },
  { name: 'BBQ PLATTER FOR 4 (Thu Special 10% OFF)', price: '$54.99', items: ['5/6 Pcs Chicken Tikka (white or dark meat)', '1/4 Chicken leg (one order)', '4 pcs Chicken or Beef Seekh Kebab', '6 pcs Bihari Kabab', '2 Biryani Rice', '4 Naans, Salad, Raita & 4 pops'] },
  { name: 'BBQ Platter for 2', price: '$29.99', items: ['Half of BBQ Platter for 4'] },
];

export const singleCombos: ComboSingle[] = [
  { name: 'Bihari Kabab with Rice & Naan', description: 'Salad, Raita or Chutney, Pop', price: '$16.49' },
  { name: 'Beef Seekh Kabab with Rice & Naan', description: 'Salad, Raita or Chutney & Pop', price: '$16.49' },
  { name: 'Chicken Tikka with Rice & Naan', description: 'Salad, Raita or Chutney, Pop (Add $2 for white meat)', price: '$16.49' },
  { name: 'Chicken Kabab with Rice & Naan', price: '$16.49' },
  { name: '1/4 Chicken Leg with Rice & Naan', price: '$10.99' },
  { name: 'Lamb Chop with Rice & Naan', price: '$19.99' },
  { name: 'Tandoori Fish with Rice & Naan', price: '$16.49' },
  { name: 'Chicken Curry Combo', description: 'Any chicken curry with Rice, 1 Naan, Salad & Pop', price: '$14.99' },
  { name: 'Beef/Veal Curry Combo', description: 'Any beef/veal curry with Rice, 1 Naan, Salad & Pop', price: '$14.99' },
  { name: 'Butter Chicken Special', description: '2 Naans or Rice & 1 Pop', price: '$15.99' },
];
