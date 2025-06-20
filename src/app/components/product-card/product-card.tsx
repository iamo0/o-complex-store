"use client";

import { Product } from "@/types/product";
import { FormEvent, PropsWithChildren, useState } from "react";
import InputNumber from "../input-number/input-number";

type ProductCardProps = {
  product: Product,
  formatter?: Intl.NumberFormat,
  onAddToCart: (quantity: number) => void,
  onRemoveFromCart: () => void,
} & PropsWithChildren;

enum ProductCardMode {
  IDLE = "idle",
  BUYING = "buying",
  BOUGHT = "bought",
}

const DEFAULT_MODE = ProductCardMode.IDLE;

const DEFAULT_FORMATTER = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

export default function ProductCard({
  product,
  onAddToCart = () => {},
  onRemoveFromCart = () => {},
  formatter = DEFAULT_FORMATTER,
}: ProductCardProps) {
  const { image_url, title, description, price } = product;

  const [mode, setMode] = useState<ProductCardMode>(DEFAULT_MODE);
  const [selectedAmount, setSelectedAmount] = useState(1);

  function handlePriceButtonClick() {
    setMode(ProductCardMode.BUYING);
  }

  function handleAmountSubmit(evt: FormEvent) {
    evt.preventDefault();
    setMode(ProductCardMode.BOUGHT);
    onAddToCart(selectedAmount);
  }

  function handleAmountReset() {
    setMode(ProductCardMode.IDLE);
  }

  function handleDeleteButtonClick() {
    if (!confirm("Вы уверены, что хотите удалить из корзины этот товар?")) {
      return;
    }

    setMode(ProductCardMode.IDLE);
    onRemoveFromCart();
  }

  const modeComponent = new Map([
    [ProductCardMode.IDLE, <button
      key={`buy-button`}
      className="px-5 py-2 --font-geist bg-lime-500 hover:bg-lime-400 border border-lime-900 rounded-sm font-bold text-white"
      onClick={handlePriceButtonClick}
    >{formatter.format(price)}</button>],

    [ProductCardMode.BUYING, <form
      key={`buy-form`}
      className="flex flex-col gap-5 items-center"
      onSubmit={handleAmountSubmit} onReset={handleAmountReset}
    >
      <InputNumber defaultValue={1} min={1} onValueChange={(newValue) => setSelectedAmount(newValue)} />
      <div className="flex flex-col gap-1">
        <button
          className="px-5 py-2 --font-geist bg-lime-500 hover:bg-lime-400 border border-lime-900 rounded-sm font-bold text-white"
          type="submit"
        >Купить за {formatter.format(price * selectedAmount)}</button>
        <button type="reset">Отмена</button>
      </div>
    </form>],

    [ProductCardMode.BOUGHT, <button
      key={`delete-button`}
      className="px-5 py-2 --font-geist bg-red-950 hover:bg-red-900 border border-lime-900 rounded-sm font-bold text-white"
      onClick={handleDeleteButtonClick}
    >✖️&nbsp;Убрать из корзины</button>],
  ]);

  return <article
    className={`p-3 bg-stone-800 border border-stone-500 shadow-md shadow-stone-700 rounded-sm flex flex-col align-start gap-1`}
  >
    <img
      src={image_url}
      alt={title}
      width={400}
      height={300}
    />
    <h3 className="pt-2 pb-1 text-xl font-bold">{title}</h3>
    <p className="mb-4">{description}</p>
    {modeComponent.get(mode)}
  </article>
}
