// /types/product.ts
export type Product = {
  id: number;
  title: string;
  description: string;
  image: string; // URL картинки
  isLiked?: boolean;
};