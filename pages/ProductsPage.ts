import { Page, Locator, expect } from "@playwright/test";
import { Given, When, Fixture } from "playwright-bdd/decorators";
import { ItemModel } from "../types/ItemModel";

let currentItem: ItemModel | null = null;

export
@Fixture("productsPage")
class ProductsPage {
  readonly page: Page;
  readonly item: Locator;
  readonly addToCartButton: Locator;
  readonly itemName: Locator;
  readonly itemDescription: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.item = this.page.locator(".inventory_item");
    this.addToCartButton = this.page.locator(".btn_inventory");
    this.itemName = this.page.locator(".inventory_item_name");
    this.itemDescription = this.page.locator(".inventory_item_desc");
    this.itemPrice = this.page.locator(".inventory_item_price");
  }

  @Given("I am on the products page")
  async navigateToProductPage() {
    try {
      expect(this.page.url()).toContain("inventory");
    } catch (e) {
      await this.page.goto("/v1/inventory.html");
    }
  }

  @When("I add an item to the cart")
  async addItemToCart() {
    // Save item info to use for validation:
    const itemName = await this.itemName.first().textContent();
    const itemDescription = await this.itemDescription.first().textContent();
    const itemPrice = await this.itemPrice.first().textContent();

    if (itemName && itemDescription && itemPrice) {
      currentItem = {
        name: itemName,
        description: itemDescription,
        price: itemPrice,
      };
    } else {
      throw new Error("Failed to retrieve item details.");
    }

    await this.addToCartButton.first().click();
  }

  static getCurrentItem(): ItemModel | null {
    return currentItem;
  }
}
