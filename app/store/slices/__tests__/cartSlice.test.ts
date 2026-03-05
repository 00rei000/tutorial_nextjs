import cartReducer, {
  addToCart,
  removeFromCart,
  increase,
  decrease,
} from "../cartSlice";
import { Product } from "../../../types/product";

const mockProduct: Product = {
  id: 1,
  name: "Samsung Galaxy A31",
  price: 6940000,
  image: "/phone.png",
  rating: 5,
  description: "Mô tả sản phẩm",
};

describe("cartSlice", () => {
  it("state ban đầu là giỏ hàng rỗng", () => {
    const state = cartReducer(undefined, { type: "" });
    expect(state.items).toEqual([]);
  });

  it("thêm sản phẩm mới vào giỏ hàng", () => {
    const state = cartReducer(undefined, addToCart(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it("thêm sản phẩm đã có → tăng số lượng lên 2", () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, addToCart(mockProduct));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("xóa sản phẩm khỏi giỏ hàng", () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, removeFromCart(1));
    expect(state.items).toHaveLength(0);
  });

  it("tăng số lượng sản phẩm", () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, increase(1));
    expect(state.items[0].quantity).toBe(2);
  });

  it("giảm số lượng sản phẩm", () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, increase(1)); // quantity = 2
    state = cartReducer(state, decrease(1)); // quantity = 1
    expect(state.items[0].quantity).toBe(1);
  });

  it("không giảm số lượng khi đã = 1", () => {
    let state = cartReducer(undefined, addToCart(mockProduct));
    state = cartReducer(state, decrease(1));
    expect(state.items[0].quantity).toBe(1);
  });
});
