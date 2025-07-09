const { expect } = require('@playwright/test');

class CartAsserts {
  constructor(page) {
    this.page = page;
    // Locators used in all tests
    this.productName  = page.locator('td.cart_description h4 a');
    this.productPrice  = page.locator('td.cart_price p');
    this.productQuantity  = page.locator("td.cart_quantity button");
  }

  // Methods used for Positive Tests - Happy path
  async shouldBeOnCartPage() {
    await expect(this.page).toHaveURL(/\/view_cart/);
  }

  async verifyCartItem(expectedItem) {
    const actualName = (await this.productName.innerText()).trim();
    const actualPrice = (await this.productPrice.innerText()).trim();
    const actualQuantity = (await this.productQuantity.innerText()).trim();

    if (
      actualName !== expectedItem.name ||
      actualPrice !== expectedItem.price ||
      actualQuantity !== String(expectedItem.quantity)
    ) {
      throw new Error(`Invalid cart data: expected ${JSON.stringify(expectedItem)}, but got { name: "${actualName}", price: "${actualPrice}", quantity: "${actualQuantity}" }`);
    }
  }

  // Methods used for Negative Tests
  async verifyQuantityFieldIsDisabled() {
    const hasDisabledClass = await this.productQuantity.evaluate(node =>
      node.classList.contains('disabled')
    );

    if (!hasDisabledClass) {
      throw new Error('Quantity field is not disabled!');
    }
  }
}

module.exports = CartAsserts;
