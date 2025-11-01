'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import ProductCard from './ProductCard';

export default function ProductList() {
  const { 
    products, 
    likedFilter, 
    searchQuery, 
    categoryFilter,
    currentPage,
    itemsPerPage,
    addProducts,
    toggleLike, 
    deleteProduct,
    setLikedFilter,
    setSearchQuery,
    setCategoryFilter,
    setCurrentPage
  } = useStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('🔄 FETCHING PRODUCTS FROM API...');
        
        const response = await fetch('https://dummyjson.com/products?limit=20');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const productsWithLikes = data.products.map((product: any) => ({
          ...product,
          isLiked: false
        }));

        console.log('📥 API PRODUCTS:', productsWithLikes.length);
        console.log('🏪 CURRENT STORE PRODUCTS:', products.length);
        
        addProducts(productsWithLikes);
        
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (products.length === 0) {
      fetchProducts();
    } else {
      setIsLoading(false);
    }
  }, [addProducts, products.length]);

  useEffect(() => {
    console.log('🛍️ ALL PRODUCTS IN STORE:', products);
    console.log('👤 USER CREATED PRODUCTS:', products.filter(p => p.id >= 10000));
  }, [products]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLike = !likedFilter || product.isLiked;
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    
    return matchesSearch && matchesLike && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const categories = Array.from(new Set(products.map(p => p.category)));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Products ({products.length})
          {products.filter(p => p.id >= 10000).length > 0 && (
            <span className="text-sm text-green-600 ml-2">
              +{products.filter(p => p.id >= 10000).length} user created
            </span>
          )}
        </h1>
        <a 
          href="/create-product" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Product
        </a>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex gap-4">
            <button
              onClick={() => setLikedFilter(false)}
              className={`px-4 py-2 rounded ${
                !likedFilter ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setLikedFilter(true)}
              className={`px-4 py-2 rounded ${
                likedFilter ? 'bg-red-500 text-white' : 'bg-gray-200'
              }`}
            >
              Liked Products
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onLike={toggleLike}
            onDelete={deleteProduct}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {paginatedProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found matching your criteria.
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>Total products: {products.length}</p>
        <p>API products: {products.filter(p => p.id < 10000).length}</p>
        <p>User products: {products.filter(p => p.id >= 10000).length}</p>
      </div>
    </div>
  );
}