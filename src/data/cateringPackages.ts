export type CateringSection = {
  heading: string;
  note?: string;
  options: string[];
};

export type CateringPackage = {
  id: string;
  name: string;
  items: string;
  price: string;
  minPeople: string;
  sections: CateringSection[];
};

export const cateringPackages: CateringPackage[] = [
  {
    id: 'basic',
    name: 'Basic',
    items: '7 items from',
    price: '$11.99',
    minPeople: 'Min. 30 People',
    sections: [
      { heading: 'Rice', note: 'Choose one of the following', options: ['Chicken Biryani', 'Veal Biryani'] },
      { heading: 'Meat Curry', note: 'Choose one of the following', options: ['Chicken Qorma', 'Chicken Karahi', 'Veal Qorma'] },
      { heading: 'Vegetables', note: 'Choose one of the following', options: ['Chana Masala', 'Aloo Palak'] },
      { heading: 'Salad', options: ["Chef's Garden Salad"] },
      { heading: 'Raita', options: ['Yogurt sauce with herbs'] },
      { heading: 'Naans', options: ['Afghani naans', 'Tandoori (add $1)'] },
      { heading: 'Dessert', note: 'Choose one of the following', options: ['Kheer', 'Gulab Jaman', 'Carrot Halwa (add $1)', 'Mango Delight (add $1)'] },
    ],
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    items: '8 items from',
    price: '$11.99',
    minPeople: 'Min. 30 People',
    sections: [
      { heading: 'Appetizer', options: ['Veggie Samosa'] },
      { heading: 'Rice', note: 'Choose one of the following', options: ['Vegetable Pulao', 'Vegetable Biryani'] },
      { heading: 'Vegetables', note: 'Choose two of the following', options: ['Chana Masala', 'Mash/Shahi Daal', 'Aloo Palak'] },
      { heading: 'Salad', options: ["Chef's Garden Salad"] },
      { heading: 'Raita', options: ['Yogurt sauce with herbs'] },
      { heading: 'Naans', options: ['Afghani naans', 'Tandoori (add $1)'] },
      { heading: 'Dessert', note: 'Choose one of the following', options: ['Kheer', 'Carrot Halwa', 'Gulab Jaman', 'Pineapple Delight (add $1)'] },
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    items: '8 items from',
    price: '$13.99',
    minPeople: 'Min. 30 People',
    sections: [
      { heading: 'Rice', note: 'Choose one of the following', options: ['Chicken Biryani', 'Veal Biryani', 'Vegetable Paluo', 'Chicken or Veal Paluo (Paluo Min. 50 ppl)'] },
      { heading: 'Meat Curry', note: 'Choose one of the following', options: ['Chicken Qorma', 'Chicken Karahi', 'Veal Qorma', 'Achar Chicken (Min. 50 ppl)'] },
      { heading: 'BBQ', options: ['Tandoori Chicken'] },
      { heading: 'Vegetables', note: 'Choose one of the following', options: ['Chana Masala', 'Aloo Palak'] },
      { heading: 'Salad', options: ["Chef's Garden Salad"] },
      { heading: 'Raita', options: ['Yogurt sauce with herbs'] },
      { heading: 'Naans', options: ['Afghani naans', 'Tandoori (add $1)'] },
      { heading: 'Dessert', note: 'Choose one of the following', options: ['Kheer', 'Gulab Jaman', 'Carrot Halwa (add $1)', 'Mango Delight (add $1)'] },
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    items: '9 items from',
    price: '$15.99',
    minPeople: 'Min. 30 People',
    sections: [
      { heading: 'Rice', note: 'Choose one of the following', options: ['Chicken Biryani', 'Veal Biryani', 'Vegetable Paluo', 'Chicken or Veal Paluo (Paluo Min. 50 ppl)'] },
      { heading: 'Meat Curry', note: 'Choose one of the following', options: ['Chicken Qorma', 'Chicken Karahi', 'Veal Qorma', 'Achar Chicken (Min. 50 ppl)'] },
      { heading: 'BBQ', note: 'Choose two of the following', options: ['Tandoori Chicken', 'Finger Fish', 'Seekah Kabob (add $2)', 'Chicken Kabob (add $2)'] },
      { heading: 'Vegetables', note: 'Choose one of the following', options: ['Chana Masala', 'Mutter Paneer', 'Aloo Palak', 'Palak Paneer'] },
      { heading: 'Salad', options: ["Chef's Garden Salad"] },
      { heading: 'Raita', options: ['Yogurt sauce with herbs'] },
      { heading: 'Naans', options: ['Afghani naans', 'Tandoori (add $1)'] },
      { heading: 'Dessert', note: 'Choose one of the following', options: ['Kheer', 'Gulab Jaman', 'Carrot Halwa (add $1)', 'Mango Delight (add $1)', 'Zarda (Min. 50 ppl)'] },
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    items: '11 items from',
    price: '$17.99',
    minPeople: 'Min. 25 People',
    sections: [
      { heading: 'Appetizer', note: 'Choose one of the following', options: ['Veggie Samosa', 'Aloo Chana Chaat', 'Chaat Papri'] },
      { heading: 'Rice', note: 'Choose one of the following', options: ['Chicken Biryani', 'Veal Biryani', 'Vegetable Paluo', 'Chicken or Veal Paluo (Paluo Min. 50 ppl)'] },
      { heading: 'Meat Curry', note: 'Choose two of the following', options: ['Chicken Qorma', 'Chicken Karahi', 'Veal Qorma', 'Veal Karahi', 'Butter Chicken', 'Achar Chicken (Min. 50 ppl)', 'Nihari (add $1)', 'Haleem (add $1)', 'Chicken Tikka Masala'] },
      { heading: 'BBQ', note: 'Choose two of the following', options: ['Tandoori Chicken', 'Finger Fish', 'Seekah Kabob (add $2)', 'Chicken Kabob (add $2)'] },
      { heading: 'Vegetables', note: 'Choose one of the following', options: ['Chana Masala', 'Mutter Paneer', 'Aloo Palak', 'Palak Paneer'] },
      { heading: 'Salad', options: ["Chef's Garden Salad"] },
      { heading: 'Raita', options: ['Yogurt sauce with herbs'] },
      { heading: 'Naans', options: ['Afghani naans', 'Tandoori (add $1)'] },
      { heading: 'Dessert', note: 'Choose one of the following', options: ['Kheer', 'Gulab Jaman', 'Carrot Halwa (add $1)', 'Mango Delight (add $1)', 'Zarda (Min. 50 ppl)'] },
    ],
  },
];
