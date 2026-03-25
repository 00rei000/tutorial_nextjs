import { Page } from "@playwright/test";

export class ProductDetailPage {
  constructor(private page: Page) {}

  async buyNow() {
    await this.page.getByRole("button", { name: "Mua Ngay" }).click();
  }
}