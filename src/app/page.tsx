import getProducts from "@/actions/products/get-products";
import getReviews from "@/actions/reviews/get-reviews";
import sanitizeHtml from 'sanitize-html';

export default async function Home() {
  const reviews = await getReviews();
  const products = await getProducts();

  const formatter = new Intl.NumberFormat("ru-RU", {
    currency: "RUB",
    style: "currency",
    maximumFractionDigits: 0,
  });

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

    <dialog
      className={`
        fixed left-[50%] top-[50%] translate -translate-x-1/2 -translate-y-1/2
        w-xs box-border px-5 py-3
        border rounded-sm border-transparent shadow-md shadow-stone-700

      `}
      open
    >
      <button className="absolute top-3 right-3">Закрыть</button>

      <h2 className="font-bold text-xl pb-2">Корзина</h2>
      <form className="flex flex-col">
        <fieldset className="flex flex-col gap-2 border-y border-stone-300 my-2 mb-5 py-2">
          <div className="text-center text-stone-600">Корзина пуста</div>
        </fieldset>

        <fieldset className="flex flex-row gap-2">
          <input
            type="tel"
            name="phone"
            className="w-[10em] --font-geist-mono bg-white text-black p-2 border rounded-sm inset-shadow-sm inset-shadow-stone-200"
          />
          <button
            type="submit"
            className="bg-lime-600 hover:bg-lime-500 px-5 py-2 text-white font-bold rounded-sm"
          >Заказать</button>
        </fieldset>
      </form>
    </dialog>

    <section className="products flex flex-col gap-5">
      {products.items.map((p) => <article
        className={`p-3 bg-stone-800 border border-stone-500 shadow-md shadow-stone-700 rounded-sm flex flex-col align-start gap-1`}
        key={`product=${p.id}`}
      >
        <img
          src={p.image_url}
          alt={p.title}
          width={400}
          height={300}
        />
        <h3 className="pt-2 pb-1 text-xl font-bold">{p.title}</h3>
        <p className="mb-2">{p.description}</p>
        <button className="px-5 py-2 --font-geist bg-lime-500 hover:bg-lime-400 border border-lime-900 rounded-sm font-bold text-white">{formatter.format(p.price)}</button>
      </article>)}
    </section>
  </>;
}
