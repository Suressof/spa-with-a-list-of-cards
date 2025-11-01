import EditProductForm from '../../../../components/EditProductForm'; 

type PageProps = {
  params: {
    id: string;
  };
}
export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/products?limit=20');
  const data = await res.json();

  return data.products.map((product: any) => ({
    id: product.id.toString(),
  }));
}
export default function EditProductPage({ params }: PageProps) {
  return <EditProductForm paramss={{ id: params.id }} />;
}