export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  isLiked?: boolean;
}

export interface ProductFormData {
  title: string;
  description: string;
  price?: string;
  brand: string;
  category: string;
  thumbnail: string;
  // Добавляем опциональные поля для формы
  discountPercentage?: string;
  rating?: string;
  stock?: string;
}