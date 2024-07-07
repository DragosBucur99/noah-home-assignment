import { Page, Locator, expect } from "@playwright/test";
import { When, Then, Fixture } from "playwright-bdd/decorators";
import { ProductsPage } from "./ProductsPage";

export
@Fixture("cartPage")
class CartPage {
  readonly page: Page;
  readonly shoppingCart: Locator;
  readonly cartItem: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCart = this.page.locator("#shopping_cart_container");
    this.cartItem = this.page.locator(".cart_item");
    this.itemName = this.cartItem.locator(".inventory_item_name");
    this.itemDescription = this.cartItem.locator(".inventory_item_desc");
    this.itemPrice = this.cartItem.locator(".inventory_item_price");
  }

  @When("I go to the cart")
  async navigateToCart() {
    await this.shoppingCart.click();
  }

  @Then("I should see the item in the cart")
  async verifyItemInCart() {
    const currentItem = ProductsPage.getCurrentItem();
    if (!currentItem) {
      throw new Error("No item added to cart from ProductsPage");
    }
    await expect(this.cartItem).toBeVisible();
    await expect(this.itemName).toHaveText(currentItem.name);
    await expect(this.itemDescription).toHaveText(currentItem.description);
    await expect(this.itemPrice).toHaveText(
      currentItem.price.replace(/\$/g, "")
    );
  }
}
