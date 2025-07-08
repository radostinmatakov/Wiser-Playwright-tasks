const BasePage = require('./basePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.signupLoginLink = page.locator("//a[normalize-space()='Signup / Login']");
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.locator('button[type="button"]:has-text("Search")');
    this.cartButton = page.locator('a[href="/view_cart"]');
  }

  async goToLogin() {
    await this.signupLoginLink.click();
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}

module.exports = HomePage;