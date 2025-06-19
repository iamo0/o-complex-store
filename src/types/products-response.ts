import { Product } from "./product";

export type ProductsResponse = {
  amount: number,
  page: number,
  total: number,
  items: Product[],
};
