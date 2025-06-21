"use client";

import { useActionState, useReducer, useState } from "react";
import ProductCard from "../product-card/product-card";
import cartReducer, { CartReducerActionType } from "@/reducers/cart-reducer";
import createOrder from "@/actions/orders/create";
import PendingButton from "../pending-button/pending-button";
import { PageState } from "@/types/page-state";
import loadNextPage from "@/actions/products/load-next-page";
import { ProductsResponse } from "@/types/products-response";

interface ProductsWithCartProps {
  products: ProductsResponse,
}

const PRODUCTS_PRICE_FORMATTER = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

export default function ProductsWithCart({ products }: ProductsWithCartProps) {
  const [loaded, action] = useActionState<PageState>(loadNextPage, {
    pageNumber: 1,
    products: products.items,
    allLoaded: products.items.length >= products.total,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const [cartProducts, dispatch] = useReducer(cartReducer, []);

  return <>
    <button
      className={`fixed right-0 top-0 z-1 m-3 mt-5 bg-lime-500 hover:bg-lime-400 shadow-xs shadow-stone-500 text-sm font-bold rounded-full px-3 py-1`}
      onClick={() => setIsCartOpened(true)}
    >{
        cartProducts.length === 0
          ? "Корзина"
          : PRODUCTS_PRICE_FORMATTER.format(cartProducts.reduce(function (acc: number, { id, quantity }) {
            return acc + loaded.products.find((p) => p.id === id)!.price * quantity;
          }, 0))
      }</button>

    <dialog
      className={`
        fixed left-[50%] top-[50%] translate -translate-x-1/2 -translate-y-1/2
        w-xs box-border px-5 py-3
        border rounded-sm border-transparent shadow-md shadow-stone-700
        max-h-screen overflow-y-auto
      `}
      open={isCartOpened}
    >
      <button className="absolute top-3 right-3" onClick={() => setIsCartOpened(false)}>Закрыть</button>

      <h2 className="font-bold text-xl pb-2">Корзина</h2>
      <form className="flex flex-col" onSubmit={async (evt) => {
        evt.preventDefault();

        const formElement = evt.target as HTMLFormElement;
        const response = await createOrder(new FormData(formElement));

        if (response.success === 0) {
          setErrorMessage(response.error);
          return;
        }

        alert("Заказ успешно оформлен");

        setIsCartOpened(false);
        setErrorMessage(null);
        dispatch({ type: CartReducerActionType.EMPTY });
        formElement.reset();
      }}>
        <fieldset className="flex flex-col gap-5 border-y border-stone-300 my-2 mb-5 py-2">
          {
            cartProducts.length === 0
              ? <div className="text-center text-stone-600">Корзина пуста</div>
              : cartProducts.map(({ id, quantity }) => <article
                className="flex flex-row justify-between items-end gap-5"
                key={`cart-record-${id}`}
              >
                <input type="hidden" name="products_ids[]" value={id} />
                <input type="hidden" name="products_quantities[]" value={quantity} />
                <span>
                  {loaded.products.find((p) => p.id === id)!.title}
                </span>
                <div className="flex flex-col items-end">
                  {
                    quantity > 1
                      ? <span className="text-stone-300 text-xs">{PRODUCTS_PRICE_FORMATTER.format(loaded.products.find((p) => p.id === id)!.price)}&times;{quantity}</span>
                      : null
                  }
                  <span className="font-bold">{PRODUCTS_PRICE_FORMATTER.format(loaded.products.find((p) => p.id === id)!.price * quantity)}</span>
                </div>
              </article>)
          }
        </fieldset>

        <fieldset className="flex flex-row gap-2">
          <input
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            className="w-[10em] --font-geist-mono bg-white text-black p-2 border rounded-sm inset-shadow-sm inset-shadow-stone-200"
            required
          />
          <PendingButton
            disabled={cartProducts.length === 0}
            type="submit"
            className="bg-lime-600 hover:bg-lime-500 disabled:opacity-60 disabled:hover:bg-lime-600 px-5 py-2 text-white font-bold rounded-sm"
          >Заказать</PendingButton>
        </fieldset>
        {
          errorMessage === null
            ? null
            : <div className="mt-3 px-1 py-0.5 font-bold text-xs text-red-900">{errorMessage}</div>
        }
      </form>
    </dialog>

    <section className="products flex flex-col gap-5">
      {loaded.products.map((p) => <ProductCard
        key={`product-${p.id}`}
        product={p}
        formatter={PRODUCTS_PRICE_FORMATTER}
        isInCart={
          cartProducts.length > 0 &&
          cartProducts.find((cp) => cp.id === p.id) !== undefined
        }
        onAddToCart={(quantity) => dispatch({
          type: CartReducerActionType.ADD,
          id: p.id,
          quantity,
        })}
        onRemoveFromCart={() => dispatch({
          type: CartReducerActionType.REMOVE,
          id: p.id,
        })}
      />)}
    </section>

    <form className="flex items-center justify-center pt-7" action={action} hidden={loaded.allLoaded}>
      <PendingButton className="px-5 py-2 --font-geist bg-lime-700 hover:bg-lime-600 border border-lime-900 rounded-sm font-bold text-white">Показать еще</PendingButton>
    </form>
  </>;
}
