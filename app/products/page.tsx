// /app/products/page.tsx
'use client';
import { useEffect } from 'react';
import ProductList from '../../components/ProductList';
import { useProductStore } from '../../store/productStore';

export default function ProductsPage() {
  const setProducts = useProductStore(state => state.setProducts);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => res.json())
      .then(data => {
        const products = data.products.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          image: p.thumbnail,
          isLiked: false,
        }));
        setProducts(products);
      });
  }, [setProducts]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductList />
    </div>
  );
}