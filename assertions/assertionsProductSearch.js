const { expect } = require('@playwright/test');

class ProductSearchAsserts {
  constructor(page) {
    this.page = page;
    // Locators used in Positive Tests - Happy path
    this.searchResultTitles = page.locator("//div[@class='productinfo text-center']//p[contains(text(),'Pure')]");
    this.addedToCart = page.locator('h4.modal-title:has-text("Added!")');
    this.addedConfirmationMessage = page.locator('p.text-center:has-text("Your product has been added to cart.")');
    this.searchResultTitles = page.locator('.productinfo.text-center p');
  }

  async shouldBeOnProductPage() {
    await expect(this.page).toHaveURL(/\/products/);
  }

  async shouldBeOnProductDetailsPage() {
    await expect(this.page).toHaveURL(/\/product_details\/\d+$/);
  }

  // Methods used for Positive Tests - Happy path
  async verifyProductVisible(expectedProductName) {
    const titles = await this.searchResultTitles.allTextContents();
    const visibleProduct = titles.map(t => t.trim()).includes(expectedProductName);
    if (!visibleProduct) {
      throw new Error(`Expected product "${expectedProductName}" not found in search results: [${titles.join(', ')}]`);
    }
  }

  async verifyProductSuccessfullyAdded() {
    await this.addedToCart.waitFor({ state: 'visible', timeout: 5000 });
    if (!(await this.addedToCart.isVisible())) {
      throw new Error('Added! modal not visible after adding product to cart!');
    }
  }

  async verifyAddToCartConfirmationMessage() {
    if (!(await this.addedConfirmationMessage.isVisible())) {
      throw new Error('Confirmation message for added product is not visible!');
    }
  }
}

module.exports = ProductSearchAsserts;
