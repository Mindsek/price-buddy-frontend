"use server";

import { prisma } from "@/lib/prisma";
import { Product } from "@/types/price-buddy";
import { revalidatePath } from "next/cache";

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        prices: {
          include: {
            supermarket: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const productsWithBestDeals = await Promise.all(
      products.map(async (product) => {
        const prices = await prisma.price.groupBy({
          by: ["productId"],
          where: {
            productId: product.id,
          },
        });

        const productsCount = prices.length;

        const bestDeals = await prisma.price.findMany({
          where: {
            productId: product.id,
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
          id: product.id.toString(),
          name: product.name,
          category: product.category,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          prices: product.prices.map((price) => ({
            id: price.id.toString(),
            store: price.supermarket.name,
            price: price.price,
            createdAt: price.createdAt,
            userId: price.userId,
            productId: price.productId,
            supermarketId: price.supermarketId,
          })),
          productsCount,
          bestDeals: bestDeals.map((deal) => deal.product.name),
        };
      })
    );

    return productsWithBestDeals;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Can't fetch products");
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        prices: {
          include: {
            supermarket: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!product) return null;

    const prices = await prisma.price.groupBy({
      by: ["productId"],
      where: {
        productId: product.id,
      },
    });

    const productsCount = prices.length;

    const bestDeals = await prisma.price.findMany({
      where: {
        productId: product.id,
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
      id: product.id.toString(),
      name: product.name,
      category: product.category,
      prices: product.prices.map((price) => ({
        id: price.id.toString(),
        store: price.supermarket.name,
        price: price.price,
        createdAt: price.createdAt,
        userId: price.userId,
        productId: price.productId,
        supermarketId: price.supermarketId,
      })),
      productsCount,
      bestDeals: bestDeals.map((deal) => deal.product.name),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Can't fetch product");
  }
}

export async function addProduct(
  name: string,
  category: string
): Promise<Product> {
  try {
    const product = await prisma.product.create({
      data: {
        name,
        category,
      },
      include: {
        prices: true,
      },
    });

    revalidatePath("/products");

    return {
      id: product.id.toString(),
      name: product.name,
      category: product.category,
      prices: [],
      productsCount: 0,
      bestDeals: [],
    };
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Can't add product");
  }
}

export async function addProductPrice(
  productId: string,
  store: string,
  price: number,
  userId: string
): Promise<void> {
  try {
    await prisma.price.create({
      data: {
        price,
        date: new Date(),
        user: {
          connect: { id: userId },
        },
        product: {
          connect: { id: productId },
        },
        supermarket: {
          connect: { name: store },
        },
      },
    });

    revalidatePath("/products");
  } catch (error) {
    console.error("Error adding price:", error);
    throw new Error("Can't add price");
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Can't delete product");
  }
}
