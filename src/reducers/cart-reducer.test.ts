import cartReducer, { CartReducerActionType } from "./cart-reducer";
import { ProductInCart } from "@/types/product-in-cart";

// NB! То, что тесты проверяют в первую очередь именно то, что возвращается
// новый инстанс это не ошибка, это прямо критикал. Если бы функциональность
// была сложнее, чем просто добавить, я бы делал через TDD и тестов было бы
// больше, но сейчас через TLD я проверил критический путь. Критический он 
// потому, что редьюсерам важно, чтобы после экшена вернулся новый инстанс

describe("Cart reducer works correctly", function () {
  describe("Cart reducer adds products correctly", function () {
    // ...Но вообще я выбирал между поведением корзины, которое есть сейчас
    // и возможностью добавлять уже добавленный товар в корзину. Тогда на этот
    // экшен было бы больше тестов, ну и работал бы он по другому, потому что он
    // скорее всего бы суммировал quanity
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
