const BasePage = require('./basePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchResultTitles = page.locator('.productinfo p');
    this.firstProduct = page.locator('.productinfo').first();
    this.addToCartButton = page.locator('a:has-text("Add to cart")').first();
    this.continueShopping = page.locator('button:has-text("Continue Shopping")');
  }

  async verifySearchResults(keyword) {
    const titles = await this.searchResultTitles.allTextContents();
    return titles.some(title => title.toLowerCase().includes(keyword.toLowerCase()));
  }

  async addFirstProductToCart() {
    await this.firstProduct.hover();
    await this.addToCartButton.click();
    await this.continueShopping.click();
  }
}

module.exports = ProductPage;

