"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, Supermarket } from "@/types/price-buddy";

type AddPriceDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  newPrice: {
    productId: string;
    store: string;
    price: string;
  };
  setNewPrice: (price: {
    productId: string;
    store: string;
    price: string;
  }) => void;
  products: Product[];
  selectedProduct: Product | null;
  supermarkets: Supermarket[];
};

export function AddPriceDialog({
  isOpen,
  onClose,
  onAdd,
  newPrice,
  setNewPrice,
  products,
  selectedProduct,
  supermarkets,
}: AddPriceDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un prix</DialogTitle>
          <DialogDescription>
            {selectedProduct
              ? `Ajouter un prix pour ${selectedProduct.name}`
              : "Sélectionnez un produit et entrez son prix dans un supermarché."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!selectedProduct && (
            <div className="grid gap-2">
              <Label htmlFor="product">Produit</Label>
              <Select
                value={newPrice.productId}
                onValueChange={(value) =>
                  setNewPrice({ ...newPrice, productId: value })
                }
              >
                <SelectTrigger id="product">
                  <SelectValue placeholder="Sélectionner un produit" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="store">Supermarché</Label>
            <Select
              value={newPrice.store}
              onValueChange={(value) =>
                setNewPrice({ ...newPrice, store: value })
              }
            >
              <SelectTrigger id="store">
                <SelectValue placeholder="Sélectionner un supermarché" />
              </SelectTrigger>
              <SelectContent>
                {supermarkets.map((supermarket) => (
                  <SelectItem key={supermarket.id} value={supermarket.name}>
                    {supermarket.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Prix (€)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={newPrice.price}
              onChange={(e) =>
                setNewPrice({ ...newPrice, price: e.target.value })
              }
              placeholder="ex: 1.99"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onAdd}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
