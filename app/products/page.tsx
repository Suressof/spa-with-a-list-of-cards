import ProductList from '../../components/ProductList';
import Link from 'next/link';
import { Product } from '../../types/product';

// Серверная функция для получения продуктов
async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products?limit=20');
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data.products.map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    brand: p.brand,
    category: p.category,
    rating: p.rating,
    thumbnail: p.thumbnail,
    isLiked: false, // SSG, просто для UI
  }));
}

export default async function ProductsPage() {
  const products = await fetchProducts();

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
        <ProductList products={products} />
      </main>
    </div>
  );
}
