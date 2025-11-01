'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '../store/useStore';

interface FormData {
  title: string;
  description: string;
  price?: string;
  brand: string;
  category: string;
  thumbnail: string;
  discountPercentage: number;
  rating: number;
  stock: number;
}

export default function ProductForm() {
    const router = useRouter();
    const addProduct = useStore(state => state.addProduct);
    const currentProducts = useStore(state => state.products);

    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        price: '0',
        brand: '',
        category: '',
        thumbnail: 'https://via.placeholder.com/300x300?text=No+Image',
        discountPercentage: 0,
        rating: 0,
        stock: 0
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log('🎯 FORM SUBMITTED');
        console.log('📝 Form data:', formData);

        try {
        const productData = {
            ...formData,
            thumbnail: formData.thumbnail.trim() === '' 
            ? 'https://via.placeholder.com/300x300?text=No+Image' 
            : formData.thumbnail
        };

        addProduct(productData);

        console.log('✅ Product added to store');

        await new Promise(resolve => setTimeout(resolve, 500));
        
        router.push('/products');
        router.refresh();
        
        } catch (error) {
        console.error('❌ Error adding product:', error);
        } finally {
        setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
        ...prev,
        [name]: name === 'price' ? Number(value) : value
        }));
     };

    return (
        <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Create New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product title"
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product description"
            />
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-2">Price *</label>
                <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Brand *</label>
                <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter brand"
                />
            </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter category"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                Leave empty to use default placeholder image
                </p>
            </div>
            </div>

            {formData.thumbnail && (
            <div className="mt-4">
                <p className="text-sm font-medium mb-2">Image Preview:</p>
                <img 
                src={formData.thumbnail} 
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
                onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Invalid+Image';
                }}
                />
            </div>
            )}

            <div className="flex gap-4 pt-6">
            <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
            >
                {isSubmitting ? 'Creating...' : 'Create Product'}
            </button>
            <button
                type="button"
                onClick={() => router.push('/products')}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
                Cancel
            </button>
            </div>
        </form>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <p>Products in store: {currentProducts.length}</p>
            <p>Form data: {JSON.stringify(formData)}</p>
        </div>
        </div>
    );
}