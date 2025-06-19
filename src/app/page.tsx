import getProducts from "@/actions/products/get-products";
import getReviews from "@/actions/reviews/get-reviews";

export default async function Home() {
  const reviews = await getReviews();
  const products = await getProducts();

  console.log(reviews);
  console.log(products);

  return <></>;
}
