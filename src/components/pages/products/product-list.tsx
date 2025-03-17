"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/price-buddy";
import { PlusCircle } from "lucide-react";

type ProductListProps = {
  products: Product[];
  onAddPrice: (product: Product) => void;
};

export function ProductList({ products, onAddPrice }: ProductListProps) {
  const getLowestPrice = (prices: Product["prices"]) => {
    if (prices.length === 0) return null;
    return Math.min(...prices.map((p) => p.price));
  };

  const getHighestPrice = (prices: Product["prices"]) => {
    if (prices.length === 0) return null;
    return Math.max(...prices.map((p) => p.price));
  };

  const getPriceDifference = (prices: Product["prices"]) => {
    const lowest = getLowestPrice(prices);
    const highest = getHighestPrice(prices);
    if (!lowest || !highest) return null;
    return (((highest - lowest) / highest) * 100).toFixed(1);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix le plus bas</TableHead>
            <TableHead>Prix le plus haut</TableHead>
            <TableHead>Différence (%)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {getLowestPrice(product.prices)?.toFixed(2) ?? "N/A"} €
              </TableCell>
              <TableCell>
                {getHighestPrice(product.prices)?.toFixed(2) ?? "N/A"} €
              </TableCell>
              <TableCell>
                {getPriceDifference(product.prices) ?? "N/A"} %
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onAddPrice(product)}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
