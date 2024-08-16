# noah-home-assignmentt

Automation end-to-end test suite using [Playwright](https://playwright.dev/ "view Playwright documentation") and [playwright-bdd](https://vitalets.github.io/playwright-bdd/#/ "view playwright-bdd documentation").

**Table of Contents**

- [Installation](#installation)
  - [Local development](#local-development)
- [Usage](#usage)
- [Configuration file](#configuration-file)
  - [Feature files](#feature-files)
  - [Page objects](#page-objects)
  - [Step definitions](#step-definitions)
  - [Reports](#reports)
  - [Directory structure](#directory-structure)

## Installation

1. Install dependencies

```bash
npm install
```

2. Install browsers

```bash
npx playwright install
```

### Local development

Copy `.env.example` into `.env` and update as required

**Note:** The user password can be found by visiting [Saucedemo](https://www.saucedemo.com/v1/)

## Usage

```bash
npm test
```

By default tests are run in headless mode using Google Chrome.

## Configuration file

Configuration options can be set using the `playwright.config.ts` file at the root of your project. For more information about the available options please consult Playwright documentation.

### Feature files

A feature file is a [Business Readable, Domain Specific Language](http://martinfowler.com/bliki/BusinessReadableDSL.html) document designed to describe software behavior without delving into implementation details. Written in [Gherkin syntax](https://github.com/cucumber/cucumber/wiki/Gherkin) these files should be stored in a folder named **features** at the root of your project.

```gherkin
# ./features/checkout.feature

Feature: Add item to cart and complete the checkout process

    Background:
        Given I am logged in as a 'standard' user
        Given I am on the products page

    Scenario: Add item to cart, verify it, and complete checkout with confirmation
        When I add an item to the cart
        When I go to the cart
        Then I should see the item in the cart
        When I proceed to checkout
        When I complete the checkout process
        Then I should see the checkout confirmation
```

### Page objects

Page objects are accessible via fixtures and are automatically loaded from `./pages`. Page objects are exposed via a camel-cased version of their filename, for example `./pages/CartPage.ts` becomes `cartPage`.

### Step definitions

Step definitions serve as the connection between feature files and the actual system under test. The step definitions are stored within the page objects and are accessible to the system via fixtures `./steps/fixtures.ts`

```javascript
// ./pages/LoginPage.ts

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
```

### Reports

Playwright's built in HTML report is automatically generated and stored in the default `./playwright-report` folder. To get a list of all the available reports consult [Playwright docs](https://playwright.dev/ "view Playwright documentation")

### Directory structure

```bash
.
├── features
│   └── checkout.feature
├── pages
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│   └── LoginPage.ts
│   └── ProductsPage.ts
└── steps
│   ├── fixtures.ts
│   └── stuff.json
└── playwright-report
```
