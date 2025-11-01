// /store/productStore.ts
import { create } from 'zustand';
import { Product } from '../types/product';

type Filter = 'all' | 'liked';

type ProductState = {
  products: Product[];
  filter: Filter;
  currentPage: number;
  perPage: number;
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  toggleLike: (id: number) => void;
  setProducts: (products: Product[]) => void;
  setFilter: (filter: Filter) => void;
  setPage: (page: number) => void;
  filteredProducts: () => Product[];
  paginatedProducts: () => Product[];
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filter: 'all',
  currentPage: 1,
  perPage: 8,
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),
  toggleLike: (id) =>
    set((state) => ({
      products: state.products.map(p => p.id === id ? { ...p, isLiked: !p.isLiked } : p)
    })),
  setProducts: (products) => set({ products }),
  setFilter: (filter) => set({ filter, currentPage: 1 }),
  setPage: (page) => set({ currentPage: page }),
  filteredProducts: () => {
    const { products, filter } = get();
    return filter === 'liked' ? products.filter(p => p.isLiked) : products;
  },
  paginatedProducts: () => {
    const { filteredProducts, currentPage, perPage } = get();
    const start = (currentPage - 1) * perPage;
    return filteredProducts().slice(start, start + perPage);
  },
}));
