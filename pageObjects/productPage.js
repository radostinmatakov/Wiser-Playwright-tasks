const BasePage = require('./basePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators used in all tests
    this.searchBar = page.locator('input[id="search_product"]');
    this.submitSearch = page.locator("button[id='submit_search']");
    this.viewProduct = page.locator("//a[normalize-space()='View Product']");
    this.addToCartButton = page.locator("//button[normalize-space()='Add to cart']");
    this.viewCart = page.locator("//p[@class='text-center']//a");
    this.productNames = page.locator('.productinfo.text-center p');
  }

  // Methods used for Positive Tests - Happy path
  async getAllProductNames() {
    const products = await this.productNames.allTextContents(); 
    return products.map(name => name.trim()).filter(name => name.length > 0);
  }
  
  async searchProduct(product) {
    await this.searchBar.fill(product);
    await this.submitSearch.click();
  }

  async addToCart() {
    await this.viewProduct.click();
    await this.addToCartButton.waitFor({ state: 'visible' });  
    while (!(await this.addToCartButton.isEnabled())) {
      await this.page.waitForTimeout(100);
    }
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.viewCart.click();
  }
}

module.exports = ProductPage;

