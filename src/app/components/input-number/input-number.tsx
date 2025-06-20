"use client"

import { InputHTMLAttributes, useEffect, useState } from "react";

type InputNumberProps = InputHTMLAttributes<HTMLInputElement> & {
  defaultValue?: number,
  step?: number,
  min?: number,
  max?: number,
  style?: { [K: string]: string | number },
  value?: number,
  onValueChange?: (value: number) => void,
};

export default function InputNumber({
  defaultValue,
  value,
  step = 1,
  min = -Infinity,
  max = Infinity,
  style = {},
  onValueChange = () => {},
  ...props
}: InputNumberProps) {
  const [currentValue, setCurrentValue] = useState<number>(value ?? defaultValue ?? 0);

  useEffect(function () {
    onValueChange(currentValue);
  }, [currentValue, onValueChange]);

  function handleDecreaseClick() {
    setCurrentValue(currentValue - step);
  }

  function handleIncreaseClick() {
    setCurrentValue(currentValue + step);
  }

  return <div className="flex flex-row gap-2" style={style}>
    <input
      type="text" {...props} value={currentValue} readOnly
      className="control-input order-1 w-[3em] text-center font-bold --font-geist-mono text-lg bg-white text-black p-2 border rounded-sm inset-shadow-sm inset-shadow-stone-200"
    />
    <button
      className="control-button control-button-dec order-0 bg-stone-200 disabled:opacity-50 border-0 rounded-sm px-2"
      type="button" disabled={currentValue === min} onClick={handleDecreaseClick}
    >Меньше</button>
    <button
      className="control-button control-button-inc order-2 bg-stone-200 disabled:opacity-50 border-0 rounded-sm px-2"
      type="button" disabled={currentValue === max} onClick={handleIncreaseClick}
    >Больше</button>

    <style jsx>{`
      .control-button {
        font-size: 0;
      }

      .control-button::after {
        font-size: 0.8rem;
      }

      .control-button-dec::after {
        content: "➖";
      }

      .control-button-inc::after {
        content: "➕";
      }
    `}</style>
  </div>;
}
