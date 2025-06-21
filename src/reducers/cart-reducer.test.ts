import cartReducer, { CartReducerActionType } from "./cart-reducer";
import { ProductInCart } from "@/types/product-in-cart";

describe("Cart reducer works correctly", function () {
  describe("Cart reducer adds products correctly", function () {
    it("When called with adding action reducer returns new instance of state object", function () {
      const initialState = [] as ProductInCart[];
      expect(cartReducer(initialState, {
        type: CartReducerActionType.ADD,
        id: 1,
        quantity: 1,
      })).not.toBe(initialState);
    });
  });

  describe("Cart reducer removes products correctly", function () {
    it("When called with removal action reducer returns new instance of state object", function () {
      const initialState = [{
        id: 1,
        quantity: 100,
      }] as ProductInCart[];

      expect(cartReducer(initialState, {
        type: CartReducerActionType.REMOVE,
        id: 1,
      })).not.toBe(initialState);
    });
  });

  describe("Cart reducer clears cart correctly", function () {
    it("When called with emptying action reducer returns new instance of state object", function () {
      const initialState = [{
        id: 1,
        quantity: 100,
      }] as ProductInCart[];

      expect(cartReducer(initialState, {
        type: CartReducerActionType.EMPTY,
      })).not.toBe(initialState);
    });
  });
});
