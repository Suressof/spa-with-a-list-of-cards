import ProductForm from '../../components/ProductForm';

export default function CreateProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Create New Product</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <ProductForm />
      </main>
    </div>
  );
}