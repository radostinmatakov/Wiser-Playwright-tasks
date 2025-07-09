const BasePage = require('./basePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.signupLoginLink = page.locator("//a[normalize-space()='Signup / Login']");
    this.productButton = page.locator('a[href="/products"]');
    this.cartButton = page.locator("//a[normalize-space()='Cart']");
  }

  async goToLogin() {
    await this.signupLoginLink.click();
  }

  async goToProducts() {
    await this.productButton.click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}

module.exports = HomePage;