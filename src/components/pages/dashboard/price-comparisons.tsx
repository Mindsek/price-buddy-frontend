"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PriceComparison = {
  productName: string;
  lowestPrice: number;
  highestPrice: number;
  lowestPriceStore: string;
  savingsPercentage: number;
};

type PriceComparisonsProps = {
  className?: string;
  priceComparisons: PriceComparison[];
};

export function PriceComparisons({
  className,
  priceComparisons,
}: PriceComparisonsProps) {
  return (
    <Card className={cn("col-span-4", className)}>
      <CardHeader>
        <CardTitle>Meilleures économies</CardTitle>
        <CardDescription>
          Les produits avec les plus grandes différences de prix
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {priceComparisons.map((comparison) => (
            <div
              key={`${comparison.productName}-${comparison.lowestPrice}`}
              className="flex items-center"
            >
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {comparison.productName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Meilleur prix : {comparison.lowestPrice.toFixed(2)}€ chez{" "}
                  {comparison.lowestPriceStore}
                </p>
              </div>
              <div className="ml-auto font-medium">
                -{comparison.savingsPercentage}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
