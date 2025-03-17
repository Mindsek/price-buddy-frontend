export type Product = {
  id: string;
  name: string;
  category: string;
  prices: Price[];
  productsCount?: number;
  bestDeals?: string[];
};

export type Price = {
  id: string;
  store: string;
  price: number;
  userId: string;
  productId: string;
  supermarketId: string;
};

export type Supermarket = {
  id: string;
  name: string;
  address: string | null;
  productsCount?: number;
  bestDeals?: string[];
};
