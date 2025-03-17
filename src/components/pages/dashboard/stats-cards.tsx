"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Euro, Package, Store, TrendingDown } from "lucide-react";

type StatsCardsProps = {
  totalSavings: number;
  totalProducts: number;
  totalStores: number;
  bestSavingPercentage: number;
};

export function StatsCards({
  totalSavings,
  totalProducts,
  totalStores,
  bestSavingPercentage,
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Économies Totales
          </CardTitle>
          <Euro className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSavings.toFixed(2)}€</div>
          <p className="text-xs text-muted-foreground">Sur tous vos achats</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Produits Suivis</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-muted-foreground">Dans votre liste</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Supermarchés</CardTitle>
          <Store className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStores}</div>
          <p className="text-xs text-muted-foreground">
            Comparés régulièrement
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Meilleure Économie
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {bestSavingPercentage.toFixed(0)}%
          </div>
          <p className="text-xs text-muted-foreground">Sur un produit</p>
        </CardContent>
      </Card>
    </div>
  );
}
