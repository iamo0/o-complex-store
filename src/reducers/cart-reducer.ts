import { ProductInCart } from "@/types/product-in-cart";

export enum CartReducerActionType {
  ADD = "add",
  REMOVE = "remove",
  EMPTY = "empty",
}

type CartReducerAction = {
  type: CartReducerActionType.ADD,
  id: number,
  quantity: number,
} | {
  type: CartReducerActionType.REMOVE,
  id: number,
} | {
  type: CartReducerActionType.EMPTY,
}

export default function cartReducer(state: ProductInCart[], action: CartReducerAction) {
  switch (action.type) {
    case CartReducerActionType.ADD: {
      return [...state, {
        id: action.id,
        quantity: action.quantity,
      }];
    }

    case CartReducerActionType.REMOVE: {
      return state.filter((rec) => rec.id !== action.id);
    }

    case CartReducerActionType.EMPTY: {
      return [];
    }
  }
}
