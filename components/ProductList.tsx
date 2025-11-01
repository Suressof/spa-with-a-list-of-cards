// /components/ProductList.tsx
import ProductCard from './ProductCard';
import { useProductStore } from '../store/productStore';

export default function ProductList() {
  const paginatedProducts = useProductStore(state => state.paginatedProducts());
  const filteredProducts = useProductStore(state => state.filteredProducts());
  const filter = useProductStore(state => state.filter);
  const setFilter = useProductStore(state => state.setFilter);
  const currentPage = useProductStore(state => state.currentPage);
  const setPage = useProductStore(state => state.setPage);
  const perPage = useProductStore(state => state.perPage);

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  return (
    <div>
      {/* Фильтр */}
      <div className="mb-4 flex gap-2">
        <button
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'liked' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('liked')}
        >
          Liked
        </button>
      </div>

      {/* Список карточек */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
