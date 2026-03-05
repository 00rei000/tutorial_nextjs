import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import CartPage from "../page";
import {
  emptyCartStore,
  filledCartStore,
  createMockStore,
} from "../../../../__mocks__/store/mockStore";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/shop/cart",
}));

describe("CartPage", () => {
  it("hiển thị tiêu đề Cart", () => {
    render(
      <Provider store={emptyCartStore}>
        <CartPage />
      </Provider>,
    );
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });

  it("hiển thị 0 items khi giỏ hàng trống", () => {
    render(
      <Provider store={emptyCartStore}>
        <CartPage />
      </Provider>,
    );
    expect(screen.getByText("0 items in bag")).toBeInTheDocument();
  });

  it("hiển thị tên sản phẩm trong giỏ hàng", () => {
    render(
      <Provider store={filledCartStore}>
        <CartPage />
      </Provider>,
    );
    expect(screen.getByText("Samsung Galaxy A31")).toBeInTheDocument();
  });

  it("tính đúng SubTotal (6940000 x 2 = 13880000)", () => {
    render(
      <Provider store={filledCartStore}>
        <CartPage />
      </Provider>,
    );
    expect(screen.getByText("13.880.000 VND")).toBeInTheDocument();
  });

  it("tính đúng Tax 10% (13880000 x 10% = 1388000)", () => {
    render(
      <Provider store={filledCartStore}>
        <CartPage />
      </Provider>,
    );
    expect(screen.getByText("1.388.000 VND")).toBeInTheDocument();
  });

  it("click nút X xóa sản phẩm khỏi giỏ", () => {
    const store = createMockStore({
      cart: {
        items: [
          {
            product: {
              id: 1,
              name: "Samsung Galaxy A31",
              price: 6940000,
              image: "/phone.png",
              rating: 5,
              description: "Mô tả",
            },
            quantity: 1,
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>,
    );
    fireEvent.click(screen.getByText("✕"));
    expect(screen.queryByText("Samsung Galaxy A31")).not.toBeInTheDocument();
  });
});
