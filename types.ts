
export type Tool = 'merch' | 'image-editor' | 'image-generator' | 'video-generator';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  colors?: ProductColor[];
}

export interface Model {
  id: string;
  name: string;
  imageUrl: string;
}

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
