'use client';

import { useParams, useRouter } from 'next/navigation';
import { useStore } from '../../../store/useStore';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const products = useStore(state => state.products);
  const deleteProduct = useStore(state => state.deleteProduct);
  
  const product = products.find(p => p.id === Number(id));

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(Number(id));
      router.push('/products');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products" className="text-blue-500 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const hasValidImage = product.thumbnail && product.thumbnail.trim() !== '';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link 
          href="/products"
          className="inline-flex items-center text-blue-500 hover:underline mb-6"
        >
          ← Back to Products
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              {hasValidImage ? (
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xl">No Image Available</span>
                </div>
              )}
            </div>
            
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span className="text-2xl font-bold text-green-600">${product.price}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Brand</span>
                  <span className="font-semibold">{product.brand}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold">{product.category}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Rating</span>
                  <span className="text-yellow-500">★ {product.rating}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span className="text-red-500">{product.discountPercentage}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Stock</span>
                  <span className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                    {product.stock} items
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}