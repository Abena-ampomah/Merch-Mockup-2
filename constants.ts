import type { Product, Model, ProductColor } from './types';

const T_SHIRT_COLORS: ProductColor[] = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Brown', hex: '#A52A2A' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Green', hex: '#008000' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Pink', hex: '#FFC0CB' },
];


export const PRODUCTS: Product[] = [
  {
    id: 'tshirt',
    name: 'T-Shirt',
    imageUrl: 'https://picsum.photos/id/237/800/800', // Placeholder
    colors: T_SHIRT_COLORS,
  },
  {
    id: 'mug',
    name: 'Coffee Mug',
    imageUrl: 'https://picsum.photos/id/30/800/800', // Placeholder
  },
  {
    id: 'tote-bag',
    name: 'Tote Bag',
    imageUrl: 'https://picsum.photos/id/119/800/800', // Placeholder
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    imageUrl: 'https://picsum.photos/id/10/800/800', // Placeholder
  },
  {
    id: 'hat',
    name: 'Hat',
    imageUrl: 'https://picsum.photos/id/1015/800/800', // Placeholder
  },
  {
    id: 'sticker',
    name: 'Sticker',
    imageUrl: 'https://picsum.photos/id/56/800/800', // Placeholder
  },
  {
    id: 'phone-case',
    name: 'Phone Case',
    imageUrl: 'https://picsum.photos/id/160/800/800', // Placeholder
  },
  {
    id: 'backpack',
    name: 'Backpack',
    imageUrl: 'https://picsum.photos/id/1020/800/800', // Placeholder
  },
  {
    id: 'beanie',
    name: 'Beanie',
    imageUrl: 'https://picsum.photos/id/674/800/800', // Placeholder
  },
  {
    id: 'socks',
    name: 'Socks',
    imageUrl: 'https://picsum.photos/id/225/800/800', // Placeholder
  },
  {
    id: 'baseball-cap',
    name: 'Baseball Cap',
    imageUrl: 'https://picsum.photos/id/1016/800/800', // Placeholder
  },
  {
    id: 'poster',
    name: 'Poster',
    imageUrl: 'https://picsum.photos/id/1019/800/800', // Placeholder
  },
  {
    id: 'car-wrap',
    name: 'Car Wrap',
    imageUrl: 'https://picsum.photos/id/1071/800/800', // Placeholder
  },
  {
    id: 'truck-decal',
    name: 'Truck Decal',
    imageUrl: 'https://picsum.photos/id/1073/800/800', // Placeholder
  },
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    imageUrl: 'https://picsum.photos/id/1025/800/800', // Placeholder
  },
  {
    id: 'pillow',
    name: 'Pillow',
    imageUrl: 'https://picsum.photos/id/1067/800/800', // Placeholder
  },
];

export const MODELS: Model[] = [
  {
    id: 'model-1',
    name: 'Model 1',
    imageUrl: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=800&h=800&fit=crop&q=80',
  },
  {
    id: 'model-2',
    name: 'Model 2',
    imageUrl: 'https://images.unsplash.com/photo-1596495578065-640866d092da?w=800&h=800&fit=crop&q=80',
  },
  {
    id: 'model-3',
    name: 'Model 3',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=800&fit=crop&q=80',
  },
  {
    id: 'model-4',
    name: 'Model 4',
    imageUrl: 'https://images.unsplash.com/photo-1617056413253-c97db1573392?w=800&h=800&fit=crop&q=80',
  },
  {
    id: 'model-5',
    name: 'Model 5',
    imageUrl: 'https://images.unsplash.com/photo-1581403341630-a6e0b8d8d49a?w=800&h=800&fit=crop&q=80',
  },
  {
    id: 'model-6',
    name: 'Model 6',
    imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&h=800&fit=crop&q=80',
  },
  {
    id: 'model-7',
    name: 'Model 7',
    imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=800&h=800&fit=crop&q=80',
  },
  {
    id: 'model-8',
    name: 'Model 8',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-4b9b655ae0b1?w=800&h=800&fit=crop&q=80',
  },
];