"use client";

import { addProduct, addProductPrice } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { Product, Supermarket } from "@/types/price-buddy";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AddPriceDialog } from "./add-price-dialog";
import { AddProductDialog } from "./add-product-dialog";
import { ProductList } from "./product-list";

type ProductsPageProps = {
  products: Product[];
  supermarkets: Supermarket[];
  userId: string;
};

export default function ProductsPage({
  products: initialProducts,
  supermarkets,
  userId,
}: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddPriceOpen, setIsAddPriceOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({ name: "", category: "" });
  const [newPrice, setNewPrice] = useState({
    productId: "",
    store: "",
    price: "",
  });

  const handleAddProduct = async () => {
    try {
      const product = await addProduct(newProduct.name, newProduct.category);
      setProducts([...products, product]);
      setNewProduct({ name: "", category: "" });
      setIsAddProductOpen(false);
      toast.success("Produit ajouté avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout du produit");
    }
  };

  const handleAddPrice = async () => {
    if (!selectedProduct) return;

    try {
      await addProductPrice(
        selectedProduct.id,
        newPrice.store,
        parseFloat(newPrice.price),
        userId
      );

      const updatedProducts = products.map((product) => {
        if (product.id === selectedProduct.id) {
          return {
            ...product,
            prices: [
              ...product.prices,
              {
                id: Date.now().toString(),
                store: newPrice.store,
                price: parseFloat(newPrice.price),
                createdAt: new Date(),
              },
            ],
          };
        }
        return product;
      });

      setProducts(updatedProducts as Product[]);
      setNewPrice({ productId: "", store: "", price: "" });
      setIsAddPriceOpen(false);
      setSelectedProduct(null);
      toast.success("Prix ajouté avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout du prix");
    }
  };

  const handleAddPriceClick = (product: Product) => {
    setSelectedProduct(product);
    setNewPrice({ ...newPrice, productId: product.id });
    setIsAddPriceOpen(true);
  };

  return (
    <div className="mx-auto p-10 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Produits</h1>
        <Button onClick={() => setIsAddProductOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un produit
        </Button>
      </div>

      <ProductList products={products} onAddPrice={handleAddPriceClick} />

      <AddProductDialog
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAdd={handleAddProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
      />

      <AddPriceDialog
        isOpen={isAddPriceOpen}
        onClose={() => {
          setIsAddPriceOpen(false);
          setSelectedProduct(null);
        }}
        onAdd={handleAddPrice}
        newPrice={newPrice}
        setNewPrice={setNewPrice}
        products={products}
        selectedProduct={selectedProduct}
        supermarkets={supermarkets}
      />
    </div>
  );
}
