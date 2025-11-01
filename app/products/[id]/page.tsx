// /app/products/[id]/page.tsx
'use client';
import { useProductStore } from '../../../store/productStore';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useProductStore(state => state.products.find(p => p.id === Number(id)));
  const router = useRouter();

  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-4">
      <button onClick={() => router.push('/products')} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Back
      </button>
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.image} className="w-full max-w-md my-4" />
      <p>{product.description}</p>
    </div>
  );
}
