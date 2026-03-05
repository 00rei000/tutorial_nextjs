import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import ProductCard from "../ProductCard";
import { emptyCartStore } from "../../../../__mocks__/store/mockStore";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/shop",
}));

const mockProduct = {
  id: 1,
  name: "Samsung Galaxy A31",
  price: 6940000,
  image: "/phone.png",
  rating: 5,
  description: "Mô tả sản phẩm",
};

describe("ProductCard", () => {
  beforeEach(() => mockPush.mockClear());

  it("hiển thị tên sản phẩm", () => {
    render(
      <Provider store={emptyCartStore}>
        <ProductCard product={mockProduct} />
      </Provider>,
    );
    expect(screen.getByText("Samsung Galaxy A31")).toBeInTheDocument();
  });

  it("hiển thị giá đúng format", () => {
    render(
      <Provider store={emptyCartStore}>
        <ProductCard product={mockProduct} />
      </Provider>,
    );
    expect(screen.getByText("6.940.000 VND")).toBeInTheDocument();
  });

  it("hiển thị đúng 5 sao rating", () => {
    render(
      <Provider store={emptyCartStore}>
        <ProductCard product={mockProduct} />
      </Provider>,
    );
    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(5);
  });

  it("hiển thị ảnh sản phẩm", () => {
    render(
      <Provider store={emptyCartStore}>
        <ProductCard product={mockProduct} />
      </Provider>,
    );
    expect(screen.getByAltText("Samsung Galaxy A31")).toBeInTheDocument();
  });

  it("click vào card chuyển đến trang chi tiết", () => {
    render(
      <Provider store={emptyCartStore}>
        <ProductCard product={mockProduct} />
      </Provider>,
    );
    fireEvent.click(screen.getByText("Samsung Galaxy A31"));
    expect(mockPush).toHaveBeenCalledWith("/shop/1");
  });
});
