import { Product } from '../types/product';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded" />
      <h2 className="mt-2 font-semibold">{product.title}</h2>
      <p className="text-gray-500">{product.brand}</p>
      <p className="text-green-600 font-bold">${product.price}</p>
    </div>
  );
}
