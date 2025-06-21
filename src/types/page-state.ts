import { Product } from "./product";

export type PageState = {
  pageNumber: number,
  products: Product[],
  allLoaded: boolean,
}
