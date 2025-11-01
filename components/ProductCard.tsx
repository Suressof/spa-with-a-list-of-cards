'use client';
import { Product } from '../types/product';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ProductCard({ product, onLike, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{product.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onLike(product.id)}
              className={`p-2 rounded-full ${
                product.isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              ♥
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-red-100"
            >
              ×
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">${product.price}</span>
          <span className="text-sm text-gray-500">{product.brand}</span>
        </div>

        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-yellow-500">★ {product.rating}</span>
          <span className="text-gray-500">{product.category}</span>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/products/${product.id}`}
            className="block mt-4 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Details
          </Link>

          <Link
            href={`/products/${product.id}/edit`}
            className="flex-1 text-center bg-green-500 text-white py-2 mt-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
