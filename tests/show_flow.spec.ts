import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import testData from "./test-data.json";

test("Login → Search → Click sản phẩm → Mua ngay → Kiểm tra tổng tiền", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  const productDetailPage = new ProductDetailPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(testData.user.username, testData.user.password);

  await shopPage.search(testData.productKeyword);
  await shopPage.clickProductByName("Xiaomi Poco F4"); 

  await productDetailPage.buyNow();

  await page.waitForURL('**/cart');
  await cartPage.expectTotal("9.339.000 VND");
});
