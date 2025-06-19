"use server";

import { ProductsResponse } from "@/types/products-response";

export default async function getProducts(page: number = 1, pageSize: number = 20) {
  const productsResponse = await fetch(`${process.env.API_URL}/products?page=${page}&page_size=${pageSize}`, {
    method: "GET",
  });

  const products = await productsResponse.json() as ProductsResponse;
  return products;
}
