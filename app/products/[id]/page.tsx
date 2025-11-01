import Link from 'next/link';
import { notFound } from 'next/navigation';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  rating: number;
  stock: number;
  discountPercentage: number;
  thumbnail: string;
};

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products?limit=20');
  const data = await res.json();

  return data.products.map((product: any) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductDetail({ params }: { params: { id: string }}) {
  let product;

  try {
    const res = await fetch(`https://dummyjson.com/products/${params.id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Product fetch failed');
    product = await res.json();
  } catch (error) {
    console.error('Failed to fetch product', params.id, error);
    return <div>Product data unavailable</div>;
  }

return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/products" className="inline-flex items-center text-blue-500 hover:underline mb-6">
          ← Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
          <div className="md:w-1/2">
            <img src={product.thumbnail} alt={product.title} className="w-full h-96 object-cover" />
          </div>

          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex gap-2 mb-4">
              <Link
                href={`/products/${product.id}/edit`}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Edit
              </Link>
            </div>

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
  );
}

