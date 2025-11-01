import ProductList from '../../components/ProductList';
import { Product } from '../../types/product';

type Props = {
  initialProducts: Product[];
};

export default function ProductsPage({ initialProducts }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <a
            href="/create-product"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Product
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ProductList initialProducts={initialProducts} />
      </main>
    </div>
  );
}

// SSG: Next.js fetch on server
export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products?limit=20');
  const data = await res.json();

  const products: Product[] = data.products.map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    discountPercentage: p.discountPercentage ?? 0,
    rating: p.rating ?? 0,
    stock: p.stock ?? 0,
    brand: p.brand,
    category: p.category,
    thumbnail: p.thumbnail,
    isLiked: false
  }));

  return products;
}
