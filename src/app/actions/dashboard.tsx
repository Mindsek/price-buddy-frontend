"use server";

import { prisma } from "@/lib/prisma";

export type DashboardData = {
  totalSavings: number;
  totalProducts: number;
  totalStores: number;
  bestSavingPercentage: number;
  priceComparisons: Array<{
    productName: string;
    lowestPrice: number;
    highestPrice: number;
    lowestPriceStore: string;
    savingsPercentage: number;
  }>;
  recentProducts: Array<{
    id: string;
    name: string;
    price: number;
    store: string;
    date: Date;
  }>;
};

export async function getDashboardData(): Promise<DashboardData> {
  const [totalProducts, totalStores, prices, recentPrices] = await Promise.all([
    prisma.product.count(),
    prisma.supermarket.count(),
    prisma.price.findMany({
      include: {
        product: true,
        supermarket: true,
      },
      orderBy: {
        price: "asc",
      },
    }),
    prisma.price.findMany({
      take: 5,
      include: {
        product: true,
        supermarket: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  // Calculate total savings
  const productPrices = new Map<string, { min: number; max: number }>();
  prices.forEach((price) => {
    const current = productPrices.get(price.productId) || {
      min: Infinity,
      max: -Infinity,
    };
    productPrices.set(price.productId, {
      min: Math.min(current.min, price.price),
      max: Math.max(current.max, price.price),
    });
  });

  const totalSavings = Array.from(productPrices.values()).reduce(
    (sum, { min, max }) => sum + (max - min),
    0
  );

  // Calculate best saving percentage
  const bestSavingPercentage = Math.max(
    ...Array.from(productPrices.values()).map(
      ({ min, max }) => ((max - min) / max) * 100
    ),
    0
  );

  // Prepare price comparisons
  const priceComparisons = Array.from(productPrices.entries())
    .map(([productId, { min, max }]) => {
      const product = prices.find((p) => p.productId === productId)?.product;
      const lowestPriceStore = prices.find(
        (p) => p.productId === productId && p.price === min
      )?.supermarket;

      if (!product || !lowestPriceStore) return null;

      return {
        productName: product.name,
        lowestPrice: min,
        highestPrice: max,
        lowestPriceStore: lowestPriceStore.name,
        savingsPercentage: Math.round(((max - min) / max) * 100),
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => b.savingsPercentage - a.savingsPercentage)
    .slice(0, 5);

  // Prepare recent products
  const recentProducts = recentPrices.map((price) => ({
    id: price.productId,
    name: price.product.name,
    price: price.price,
    store: price.supermarket.name,
    date: price.createdAt,
  }));

  return {
    totalSavings,
    totalProducts,
    totalStores,
    bestSavingPercentage,
    priceComparisons,
    recentProducts,
  };
}
