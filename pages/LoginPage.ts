import { Page, Locator } from "@playwright/test";
import { Given, Fixture } from "playwright-bdd/decorators";

export
@Fixture("loginPage")
class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator("#user-name");
    this.passwordInput = this.page.locator("#password");
    this.loginButton = this.page.locator("#login-button");
  }

  @Given("I am logged in as a {string} user")
  async loginAs(user: string) {
    await this.page.goto("/v1");
    switch (user) {
      case "standard":
        await this.usernameInput.fill("standard_user");
        break;
      case "locked out":
        await this.usernameInput.fill("locked_out_user");
        break;
      case "problem":
        await this.usernameInput.fill("problem_user");
        break;
      case "performance glitch":
        await this.usernameInput.fill("performance_glitch_user");
        break;
      default:
        throw new Error(`Unknown user type: ${user}`);
    }

    await this.passwordInput.fill(process.env.USER_PASSWORD as string);
    await this.loginButton.click();
  }
}
