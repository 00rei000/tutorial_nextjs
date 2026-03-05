import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import ShopPage from "../page";
import { emptyCartStore } from "../../../__mocks__/store/mockStore";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/shop",
}));

describe("ShopPage", () => {
  it("hiển thị danh sách sản phẩm", () => {
    render(
      <Provider store={emptyCartStore}>
        <ShopPage />
      </Provider>,
    );
    const products = screen.getAllByText(/Samsung/i);
    expect(products.length).toBeGreaterThan(0);
  });

  it("tìm kiếm đúng sản phẩm theo tên", () => {
    render(
      <Provider store={emptyCartStore}>
        <ShopPage />
      </Provider>,
    );
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Samsung" } });
    expect(screen.getAllByText(/Samsung/i).length).toBeGreaterThan(0);
  });

  it("hiển thị thông báo khi không tìm thấy sản phẩm", () => {
    render(
      <Provider store={emptyCartStore}>
        <ShopPage />
      </Provider>,
    );
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "xxxxxx" } });
    expect(screen.getByText("Không tìm thấy sản phẩm nào")).toBeInTheDocument();
  });

  it("hiển thị tiêu đề Shop", () => {
    render(
      <Provider store={emptyCartStore}>
        <ShopPage />
      </Provider>,
    );
    // Dùng getAllByText vì "Shop" xuất hiện ở cả tiêu đề và breadcrumb
    const shopTexts = screen.getAllByText("Shop");
    expect(shopTexts.length).toBeGreaterThan(0);
  });
});
