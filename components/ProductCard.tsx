// /components/ProductCard.tsx
import { Product } from '../types/product';
import { useRouter } from 'next/navigation';
import { useProductStore } from '../store/productStore';

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const toggleLike = useProductStore(state => state.toggleLike);
  const removeProduct = useProductStore(state => state.removeProduct);

  return (
    <div
      className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md flex flex-col"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <img src={product.image} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-3 flex-1">{product.description}</p>

        <div className="flex justify-between mt-2">
          <button
            onClick={(e) => { e.stopPropagation(); toggleLike(product.id); }}
            className={`p-1 rounded-full ${product.isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            ♥
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); removeProduct(product.id); }}
            className="p-1 rounded-full bg-gray-200 hover:bg-red-100"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
