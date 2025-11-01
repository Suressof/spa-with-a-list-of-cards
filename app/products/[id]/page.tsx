'use server';
import { Product } from '../../../types/product';

type Params = { params: { id: string } };

async function fetchProduct(id: string): Promise<Product> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  } catch (err) {
    throw new Error('Not found');
  }
}

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products?limit=20');
  const data = await res.json();
  return data.products.map((p: any) => ({ id: p.id.toString() }));
}

export default async function ProductPage({ params }: Params) {
  const product = await fetchProduct(params.id);

  if (!product) {
    return <div className="p-8 text-center text-red-500">Product not found.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p>{product.description}</p>
      <p className="text-green-600">${product.price}</p>
    </div>
  );
}
