import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/login");
  }

  async login(username: string, password: string) {
    await this.page
      .getByRole("textbox", { name: "Tên đăng nhập" })
      .fill(username);
    await this.page.getByRole("textbox", { name: "Mật khẩu" }).fill(password);
    await this.page.getByRole("button", { name: "Đăng nhập" }).click();
  }
}
