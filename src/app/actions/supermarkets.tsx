"use server";

import { prisma } from "@/lib/prisma";
import { Supermarket } from "@/types/price-buddy";
import { revalidatePath } from "next/cache";

export async function getSupermarkets(): Promise<Supermarket[]> {
  try {
    const supermarkets = await prisma.supermarket.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const supermarketsWithCounts = await Promise.all(
      supermarkets.map(async (supermarket) => {
        const prices = await prisma.price.groupBy({
          by: ["productId"],
          where: {
            supermarketId: supermarket.id,
          },
        });

        const productsCount = prices.length;

        const bestDeals = await prisma.price.findMany({
          where: {
            supermarketId: supermarket.id,
          },
          include: {
            product: true,
          },
          orderBy: {
            price: "asc",
          },
          take: 3,
          distinct: ["productId"],
        });

        return {
          id: supermarket.id.toString(),
          name: supermarket.name,
          address: supermarket.address || "",
          productsCount,
          bestDeals: bestDeals.map((deal) => deal.product.name),
        };
      })
    );

    return supermarketsWithCounts;
  } catch (error) {
    console.error("Error fetching supermarkets:", error);
    throw new Error("Can't fetch supermarkets");
  }
}

export async function getSupermarketById(
  id: string
): Promise<Supermarket | null> {
  try {
    const supermarket = await prisma.supermarket.findUnique({
      where: { id },
    });

    if (!supermarket) return null;

    const prices = await prisma.price.groupBy({
      by: ["productId"],
      where: {
        supermarketId: supermarket.id,
      },
    });

    const productsCount = prices.length;

    const bestDeals = await prisma.price.findMany({
      where: {
        supermarketId: supermarket.id,
      },
      include: {
        product: true,
      },
      orderBy: {
        price: "asc",
      },
      take: 3,
      distinct: ["productId"],
    });

    return {
      id: supermarket.id.toString(),
      name: supermarket.name,
      address: supermarket.address || "",
      productsCount,
      bestDeals: bestDeals.map((deal) => deal.product.name),
    };
  } catch (error) {
    console.error("Error fetching supermarket:", error);
    throw new Error("Can't fetch supermarket");
  }
}

export async function addSupermarket(
  name: string,
  address: string
): Promise<Supermarket> {
  try {
    const newSupermarket = await prisma.supermarket.create({
      data: {
        name,
        address,
      },
    });

    revalidatePath("/supermarkets");

    return {
      id: newSupermarket.id.toString(),
      name: newSupermarket.name,
      address: newSupermarket.address || "",
      productsCount: 0,
      bestDeals: [],
    };
  } catch (error) {
    console.error("Error adding supermarket:", error);
    throw new Error("Can't add supermarket");
  }
}

export async function deleteSupermarket(id: string): Promise<boolean> {
  try {
    await prisma.supermarket.delete({
      where: { id },
    });

    revalidatePath("/supermarkets");
    return true;
  } catch (error) {
    console.error("Error deleting supermarket:", error);
    throw new Error("Can't delete supermarket");
  }
}
