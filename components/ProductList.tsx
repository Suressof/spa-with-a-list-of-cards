'use client';

import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

type Props = {
  initialProducts: Product[];
};

export default function ProductList({ initialProducts }: Props) {
  const { products, addProducts } = useStore();

  // Добавляем продукты в store при первом рендере
  useEffect(() => {
    if (products.length === 0) {
      addProducts(initialProducts);
    }
  }, [addProducts, initialProducts, products.length]);

  if (products.length === 0) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
