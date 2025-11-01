// /components/ProductList.tsx
import { useProductStore } from '../store/productStore';
import ProductCard from './ProductCard';

export default function ProductList() {
  const products = useProductStore(state => state.products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
