// Items & spelling mirror the promo graphics in /public/images/gallery/daily
// exactly — left-to-right reading order from each day image. Prices are kept
// from the prior data mapped to the closest matching dish type; confirm with
// the owner before shipping price-sensitive updates.
export const dailySpecials = [
  { day: 'Tuesday', items: [
    { name: 'Chicken Biryani',      price: '$7.49' },
    { name: 'Beef Kebab Roll',      price: '$6.49' },
    { name: 'Veal Qorma + Naan',    price: '$9.99' },
  ] },
  { day: 'Wednesday', items: [
    { name: 'Veal Palao',           price: '$9.49' },
    { name: 'Chicken Kebab Roll',   price: '$6.49' },
    { name: 'Chicken Qorma + Naan', price: '$8.49' },
  ] },
  { day: 'Thursday', items: [
    { name: 'Chicken Karahi + Naan',   price: '$9.99' },
    { name: 'Veal Biryani',            price: '$9.49' },
    { name: '1/4 Chicken Leg + Naan',  price: '$6.99' },
  ] },
  { day: 'Friday', items: [
    { name: 'Butter Chicken',     price: '$10.99' },
    { name: 'Chicken Tikka Roll', price: '$6.49' },
    { name: 'Mash Shahi Daal',    price: '$7.99' },
  ] },
  { day: 'Saturday', items: [
    { name: 'Nihari + Naan',  price: '$11.99' },
    { name: 'Channa Masala',  price: '$7.99' },
  ] },
  { day: 'Sunday', items: [
    { name: 'Vegetable Biryani',              price: '$7.99' },
    { name: 'Haleem + Naan or Biryani Rice',  price: '$11.99' },
  ] },
];
