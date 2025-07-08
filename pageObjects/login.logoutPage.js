const BasePage = require('./basePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators used in Positive Tests - Happy path
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.logoutButton = page.locator("//a[normalize-space()='Logout']");
  }

  // Methods used for Positive Tests - Happy path
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  // Methods used for Negative Tests 
  async loginInvalid(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;

