export type Product = {
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
  images?: string[]; // добавляем массив изображений
  isLiked?: boolean;
};

// Тип для формы редактирования/создания продукта
export type ProductFormData = {
  title: string;
  description: string;
  price?: string;
  discountPercentage?: string;
  rating?: string;
  stock?: string;
  brand: string;
  category: string;
  thumbnail: string;
};
