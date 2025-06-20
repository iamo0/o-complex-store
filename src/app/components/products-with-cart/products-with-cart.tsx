"use client";

import { useReducer, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "../product-card/product-card";
import cartReducer, { CartReducerActionType } from "@/reducers/cart-reducer";

interface ProductsWithCartProps {
  products: Product[],
}

const PRODUCTS_PRICE_FORMATTER = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

export default function ProductsWithCart({ products }: ProductsWithCartProps) {
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
            return acc + products.find((p) => p.id === id)!.price * quantity;
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
      <form className="flex flex-col">
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
                  {products.find((p) => p.id === id)!.title}
                </span>
                <div className="flex flex-col items-end">
                  {
                    quantity > 1
                      ? <span className="text-stone-300 text-xs">{PRODUCTS_PRICE_FORMATTER.format(products.find((p) => p.id === id)!.price)}&times;{quantity}</span>
                      : null
                  }
                  <span className="font-bold">{PRODUCTS_PRICE_FORMATTER.format(products.find((p) => p.id === id)!.price * quantity)}</span>
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
          <button
            disabled={cartProducts.length === 0}
            type="submit"
            className="bg-lime-600 hover:bg-lime-500 disabled:opacity-60 disabled:hover:bg-lime-600 px-5 py-2 text-white font-bold rounded-sm"
          >Заказать</button>
        </fieldset>
      </form>
    </dialog>

    <section className="products flex flex-col gap-5">
      {products.map((p) => <ProductCard
        key={`product-${p.id}`}
        product={p}
        formatter={PRODUCTS_PRICE_FORMATTER}
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
  </>;
}
