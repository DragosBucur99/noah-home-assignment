import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
require("dotenv").config();

const testDir = defineBddConfig({
  paths: ["features/*.feature"],
  importTestFrom: "steps/fixtures.ts",
  quotes: "single",
});

export default defineConfig({
  testDir,
  reporter: "html",
  use: {
    baseURL: "https://www.saucedemo.com",
    headless: true,
    screenshot: "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
