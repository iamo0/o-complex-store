"use server";

import getProducts from "./get-products";
import { PageState } from "@/types/page-state";

export default async function loadNextPage(state: PageState) {
  const newProducts = await getProducts(state.pageNumber + 1);
  const newProductsList = [...state.products, ...newProducts.items];

  const newState = {
    pageNumber: state.pageNumber + 1,
    products: newProductsList,
    allLoaded: newProductsList.length >= newProducts.total,
  } as PageState;

  return newState;
}
