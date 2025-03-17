"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type RecentProduct = {
  id: string;
  name: string;
  price: number;
  store: string;
  date: Date;
};

type RecentProductsProps = {
  className?: string;
  recentProducts: RecentProduct[];
};

export function RecentProducts({
  className,
  recentProducts,
}: RecentProductsProps) {
  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Ajouts Récents</CardTitle>
        <CardDescription>Les derniers prix ajoutés</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentProducts.map((product) => (
            <div
              key={`${product.id}-${product.store}-${product.date.getTime()}`}
              className="flex items-center"
            >
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {product.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {product.price.toFixed(2)}€ chez {product.store}
                </p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">
                {format(product.date, "d MMMM", { locale: fr })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
