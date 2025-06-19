import getProducts from "@/actions/products/get-products";
import getReviews from "@/actions/reviews/get-reviews";
import sanitizeHtml from 'sanitize-html';

export default async function Home() {
  const reviews = await getReviews();
  const products = await getProducts();

  return <>
    <section className="reviews">
      {reviews.map(({ id, text }) => <article
        key={`review-${id}`}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
      />)}
    </section>

    <section className="cart"></section>

    <section className="products">
      {products.items.map((p) => <article key={`product=${p.id}`}>
        <img src={p.image_url} alt={p.title} width={400} height={300} />
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <p>{p.price}₽</p>
      </article>)}
    </section>
  </>;
}
