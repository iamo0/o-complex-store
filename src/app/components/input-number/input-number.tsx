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

  // NB! Хочу явно рассказать про два трюка, которые я использую
  // 1. Написать явный текст на кнопке и скрыть его. На кнопках написано «Меньше» и «Больше»
  //    но показаны иконки плюса и минуса. Я пишу текст и показываю иконки через CSS
  //    для доступности, чтобы экранная читалка показала эту кнопку как кнопку с явно
  //    написанным текстом
  // 2. В разметке сначала поле ввода, потом контролы, а меняется их порядок только визуально
  //    тоже из соображений, что не всегда разметка страницы должна один в один соответстовать
  //    тому, что видит пользователь. Иногда логичней сделать разметку немного не такой, как, например
  //    в этом случае я сгруппировал контролы. Я вообще подумывал обернуть их в контейнер, 
  //    но решил, что это ту мач
  
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
