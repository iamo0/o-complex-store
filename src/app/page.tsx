import getProducts from "@/actions/products/get-products";
import getReviews from "@/actions/reviews/get-reviews";
import sanitizeHtml from 'sanitize-html';
import ProductsWithCart from "./components/products-with-cart/products-with-cart";

export default async function Home() {
  const reviews = await getReviews();
  const products = await getProducts();

  return <>
    <section className="reviews flex flex-col gap-5 mb-10">
      {reviews.map(({ id, text }) => <article
        key={`review-${id}`}
        dangerouslySetInnerHTML={{
          __html:
            sanitizeHtml(text)
              // NB! Pretty naive solution
              // but it works for now
              .replace("h1", "h3")
        }}
        className="bg-white text-black p-2 shadow-md shadow-gray-900"
      />)}
    </section>

    <ProductsWithCart products={products} />
  </>;
}
