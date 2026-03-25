import { Page } from "@playwright/test";

export class ShopPage {
  constructor(private page: Page) {}

  async search(keyword: string) {
    await this.page.getByRole("textbox", { name: "Search..." }).fill(keyword);
  }

  async clickProductByName(name: string) {
    await this.page.getByText(name, { exact: false }).first().click();
  }
}