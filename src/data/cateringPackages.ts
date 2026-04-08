export type CateringPackage = {
  id: string;
  name: string;
  price: string;
  items: string[];
};

export const cateringPackages: CateringPackage[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$10.49',
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
    ],
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    price: '$10.49',
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    price: '$12.49',
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: '$14.49',
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: '$16.49',
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
      'Item 8',
      'Item 9',
    ],
  },
];
