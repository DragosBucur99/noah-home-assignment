import { Locator, Page, expect } from "@playwright/test";
import { When, Then, Fixture } from "playwright-bdd/decorators";

export
@Fixture("checkoutPage")
class CheckoutPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly checkoutConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = this.page.locator(".checkout_button");
    this.firstNameInput = this.page.locator("#first-name");
    this.lastNameInput = this.page.locator("#last-name");
    this.postalCodeInput = this.page.locator("#postal-code");
    this.continueButton = this.page.locator(".btn_primary[value='CONTINUE']");
    this.finishButton = this.page.getByRole("link", { name: "FINISH" });
    this.checkoutConfirmation = this.page.locator(
      "#checkout_complete_container"
    );
  }

  @When("I proceed to checkout")
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  @When("I complete the checkout process")
  async completeCheckout() {
    await this.firstNameInput.fill("Test");
    await this.lastNameInput.fill("Test");
    await this.postalCodeInput.fill("1234");
    await this.continueButton.click();
    await this.finishButton.click();
  }

  @Then("I should see the checkout confirmation")
  async verifyCheckoutConfirmation() {
    await expect(this.checkoutConfirmation).toBeVisible();
  }
}
