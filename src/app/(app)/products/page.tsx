import { getProducts } from "@/app/actions/products";
import { getSupermarkets } from "@/app/actions/supermarkets";
import ProductsPage from "@/components/pages/products/products";
import { auth } from "@/lib/auth";
import { Product, Supermarket } from "@/types/price-buddy";

export default async function Products() {
  let products: Product[] = [];
  let supermarkets: Supermarket[] = [];
  const session = await auth();

  try {
    products = await getProducts();
    supermarkets = await getSupermarkets();
  } catch (error) {
    console.error("Erreur lors du chargement des produits:", error);
  }

  return (
    <ProductsPage
      products={products}
      supermarkets={supermarkets}
      userId={session?.user?.id ?? ""}
    />
  );
}
