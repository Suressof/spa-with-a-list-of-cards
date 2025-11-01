// /app/create-product/page.tsx
'use client';
import { useState } from 'react';
import { useProductStore } from '../../store/productStore';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const addProduct = useProductStore(state => state.addProduct);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc || !image) return alert('All fields required');
    addProduct({ id: Date.now(), title, description: desc, image, isLiked: false });
    router.push('/products');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Create Product</h1>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
      <input type="text" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
      <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} className="w-full p-2 mb-2 border rounded"/>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-2">Create</button>
    </form>
  );
}
