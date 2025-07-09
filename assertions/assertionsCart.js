const { expect } = require('@playwright/test');

class CartAsserts {
  constructor(page) {
    this.page = page;
    // Locators used in all tests
    this.productName  = page.locator('td.cart_description h4 a');
    this.productPrice  = page.locator('td.cart_price p');
    this.productQuantity  = page.locator("td.cart_quantity button");
    this.productTotalPrice = page.locator("td.cart_total p");   
  }

  // Methods used for Positive Tests - Happy path
  async shouldBeOnCartPage() {
    await expect(this.page).toHaveURL(/\/view_cart/);
  }

  async getProductInfoByName(name) {
    const productCard = this.page.locator('.productinfo.text-center', { hasText: name });

    const productName = (await productCard.locator('p').innerText()).trim();
    const priceText = (await productCard.locator('h2').innerText()).trim(); 

    return {
      name: productName,
      price: priceText
    };
}

  async verifyCartItem(expectedItem) {
    const actualName = (await this.productName.innerText()).trim();
    const actualPrice = (await this.productPrice.innerText()).trim();
    const actualQuantity = (await this.productQuantity.innerText()).trim();
    const actualTotalPrice = (await this.productTotalPrice.innerText()).trim();

    if (
      actualName !== expectedItem.name ||
      actualPrice !== expectedItem.price ||
      actualQuantity !== String(expectedItem.quantity) ||
      actualTotalPrice !== expectedItem.totalPrice 
    ) {
      throw new Error(`Invalid cart data: expected ${JSON.stringify(expectedItem)}, but got { name: "${actualName}", price: "${actualPrice}", quantity: "${actualQuantity}", totalPrice: "${actualTotalPrice}" }`);
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
