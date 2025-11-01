import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductFormData } from '../types/product';

interface StoreState {
  products: Product[];
  likedFilter: boolean;
  searchQuery: string;
  categoryFilter: string;
  currentPage: number;
  itemsPerPage: number;
  
  // Actions
  setProducts: (products: Product[]) => void;
  addProducts: (newProducts: Product[]) => void; // НОВЫЙ МЕТОД
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (productData: ProductFormData) => void;
  updateProduct: (id: number, productData: ProductFormData) => void; // ОБНОВЛЕНО
  setLikedFilter: (liked: boolean) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [],
      likedFilter: false,
      searchQuery: '',
      categoryFilter: '',
      currentPage: 1,
      itemsPerPage: 8,

      setProducts: (products) => set({ products }),

      // НОВЫЙ МЕТОД: добавляет продукты без перезаписи существующих
      addProducts: (newProducts) => set((state) => {
        // Фильтруем новые продукты, оставляем только те, которых еще нет
        const existingIds = new Set(state.products.map(p => p.id));
        const uniqueNewProducts = newProducts.filter(product => !existingIds.has(product.id));
        
        return { 
          products: [...state.products, ...uniqueNewProducts] 
        };
      }),

      toggleLike: (id) => set((state) => ({
        products: state.products.map(product =>
          product.id === id ? { ...product, isLiked: !product.isLiked } : product
        )
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(product => product.id !== id)
      })),

      addProduct: (productData) => set((state) => {
        // Генерируем уникальный ID (начинаем с 10000 чтобы не конфликтовать с API)
        const maxId = state.products.length > 0 
          ? Math.max(...state.products.map(p => p.id)) 
          : 10000;
        
        const newProduct: Product = {
          id: maxId + 1,
          title: productData.title,
          description: productData.description,
          price: productData.price ? Number(productData.price) : 0, // 👈 преобразуем в число
          brand: productData.brand,
          category: productData.category,
          thumbnail: productData.thumbnail,
          discountPercentage: productData.discountPercentage ? Number(productData.discountPercentage) : 0,
          rating: productData.rating ? Number(productData.rating) : 0,
          stock: productData.stock ? Number(productData.stock) : 0,
          images: [productData.thumbnail],
          isLiked: false
        };

        console.log('🆕 CREATING NEW PRODUCT:', newProduct);
        
        return { products: [...state.products, newProduct] };
      }),

    updateProduct: (id, productData) => set((state) => {
      console.log('🔄 UPDATING PRODUCT:', id, productData);

      const updatedProducts = state.products.map(product =>
        product.id === id 
          ? { 
              ...product,
              title: productData.title,
              description: productData.description,
              price: Number(productData.price), // 👈 строго number
              discountPercentage: Number(productData.discountPercentage || 0),
              rating: Number(productData.rating || 0),
              stock: Number(productData.stock || 0),
              brand: productData.brand,
              category: productData.category,
              thumbnail: productData.thumbnail,
              images: [productData.thumbnail],
            }
          : product
      );

      console.log('📦 PRODUCTS AFTER UPDATE:', updatedProducts);

      return { products: updatedProducts };
    }),


      setLikedFilter: (likedFilter) => set({ likedFilter, currentPage: 1 }),
      setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
      setCategoryFilter: (categoryFilter) => set({ categoryFilter, currentPage: 1 }),
      setCurrentPage: (currentPage) => set({ currentPage }),
    }),
    {
      name: 'products-store',
      partialize: (state) => ({ products: state.products }),
    }
  )
);