import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async expectTotal(expected: string) {
    await expect(this.page.getByText(expected)).toBeVisible();
  }
}