const { expect } = require('@playwright/test');

class LoginLogoutAsserions {
  constructor(page) {
    this.page = page;
    // Locators used in Positive Tests - Happy path
    this.loggedInText = page.locator('a:has-text("Logged in as")');
    this.loginLink = page.locator("//a[normalize-space()='Signup / Login']");
    // Locators used in Negative Tests
    this.errorMessage = page.locator('p:has-text("Your email or password is incorrect!")');

  }
  
  async shouldBeOnLoginPage() {
    await expect(this.page).toHaveURL(/\/login/);
  }

  // Methods used for Positive Tests - Happy path
  async verifyLoggedIn(username) {
    const text = await this.loggedInText.textContent();
    if (!text.includes(username)) {
      throw new Error(`Expected username "${username}", got "${text}"`);
    }
  }

  async verifyLoggedOut() {
    const isVisible = await this.loginLink.isVisible();
    if (!isVisible) {
      throw new Error(`Login link not visible after logout!`);
    }
  }

  // Methods used for Negative Tests 
  async verifyLoginErrorMessage() {
    if (!(await this.errorMessage.isVisible())) {
      throw new Error('Login error message not visible for Incorrect credentioals!');
    }
  }
}

module.exports = LoginLogoutAsserions;