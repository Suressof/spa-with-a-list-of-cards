'use client';

import Link from 'next/link';
import ProductList from '../../components/ProductList';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <Link 
            href="/create-product"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Product
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <ProductList />
      </main>
    </div>
  );
}