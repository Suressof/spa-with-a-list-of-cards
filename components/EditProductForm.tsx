'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useStore } from '../store/useStore';
// import { ProductFormData } from '../types/product';

export interface ProductFormData {
  title: string;
  description: string;
  price?: string;
  brand: string;
  category: string;
  thumbnail: string;
  // Добавляем опциональные поля для формы
  discountPercentage?: string;
  rating?: string;
  stock?: string;
}
type PageProps = {
  paramss: {
    id: string;
  };
};

export default function EditProductForm({paramss }: PageProps) {
  const router = useRouter();
  // const params = useParams();
  const productId = Number(paramss.id);
  
  const { products, updateProduct } = useStore();
  const currentProduct = products.find(p => p.id === productId);

  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: '0', 
    discountPercentage: '0',
    rating: '0',
    stock: '0',
    brand: '',
    category: '',
    thumbnail: ''
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Заполняем форму данными продукта при загрузке
  useEffect(() => {
    if (currentProduct) {
      setFormData({
        title: currentProduct.title,
        description: currentProduct.description,
        price: currentProduct.price.toString(),
        discountPercentage: currentProduct.discountPercentage.toString(),
        rating: currentProduct.rating.toString(),
        stock: currentProduct.stock.toString(),
        brand: currentProduct.brand,
        category: currentProduct.category,
        thumbnail: currentProduct.thumbnail
      });
    }
  }, [currentProduct]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (Number(formData.price) <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Image URL is required';
    if (Number(formData.discountPercentage) < 0 || Number(formData.discountPercentage) > 100) {
      newErrors.discountPercentage = 'Discount must be between 0 and 100';
    }
    if (Number(formData.rating) < 0 || Number(formData.rating) > 5) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }
    if (Number(formData.stock) < 0) newErrors.stock = 'Stock cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log('🎯 UPDATING PRODUCT:', productId, formData);
      updateProduct(productId, formData);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      router.push(`/products/${productId}`);
      router.refresh();
      
    } catch (error) {
      console.error('❌ Error updating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['price', 'discountPercentage', 'rating', 'stock'].includes(name)
        ? Number(value)
        : value
    }));
  };

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button 
            onClick={() => router.push('/products')}
            className="text-blue-500 hover:underline"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Edit Product</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.brand ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.thumbnail ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount %
                </label>
                <input
                  type="number"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.discountPercentage ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.discountPercentage && <p className="text-red-500 text-sm mt-1">{errors.discountPercentage}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.rating ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.stock ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
              >
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/products/${productId}`)}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}