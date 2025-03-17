"use client";

import { DashboardData } from "@/app/actions/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Analytics } from "./analytics";
import { PriceComparisons } from "./price-comparisons";
import { RecentProducts } from "./recent-products";
import { StatsCards } from "./stats-cards";

type DashboardPageProps = {
  data: DashboardData;
};

export default function DashboardPage({ data }: DashboardPageProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d&apos;ensemble</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <StatsCards
            totalSavings={data.totalSavings}
            totalProducts={data.totalProducts}
            totalStores={data.totalStores}
            bestSavingPercentage={data.bestSavingPercentage}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <PriceComparisons
              className="col-span-4"
              priceComparisons={data.priceComparisons}
            />
            <RecentProducts
              className="col-span-3"
              recentProducts={data.recentProducts}
            />
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
