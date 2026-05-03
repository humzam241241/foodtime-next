// Items & spelling mirror the promo graphics in /public/images/gallery/daily
// exactly — left-to-right reading order from each day image. Prices are kept
// from the prior data mapped to the closest matching dish type; confirm with
// the owner before shipping price-sensitive updates.
export const dailySpecials = [
  { day: 'Tuesday', items: [
    { name: 'Chicken Biryani',      price: '$8.49' },
    { name: 'Beef Kebab Roll',      price: '$7.49' },
    { name: 'Veal Qorma + Naan',    price: '$13.99' },
  ] },
  { day: 'Wednesday', items: [
    { name: 'Veal Palao',           price: '$11.99' },
    { name: 'Chicken Kebab Roll',   price: '$7.49' },
    { name: 'Chicken Qorma + Naan', price: '$11.49' },
  ] },
  { day: 'Thursday', items: [
    { name: 'Chicken Karahi + Naan',   price: '$12.49' },
    { name: 'Lamb/Goat Biryani',       price: '$13.99' },
    { name: '1/4 Chicken Leg + Naan',  price: '$8.99' },
  ] },
  { day: 'Friday', items: [
    { name: 'Butter Chicken + Naan', price: '$14.49' },
    { name: 'Chicken Tikka Roll',    price: '$7.49' },
    { name: 'Veal Biryani',          price: '$11.99' },
  ] },
  { day: 'Saturday', items: [
    { name: 'Nihari + Naan',  price: '$13.99' },
    { name: 'Channa Masala',  price: '$8.99' },
  ] },
  { day: 'Sunday', items: [
    { name: 'Vegetable Biryani',              price: '$8.49' },
    { name: 'Haleem + Naan or Biryani Rice',  price: '$13.99' },
  ] },
];
