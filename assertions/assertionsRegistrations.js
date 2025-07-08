const { expect } = require('@playwright/test');

class RegistrationAsserts {
  constructor(page) {
    this.page = page;
    // Locators used in Positive Tests - Happy path
    this.successMessage = page.locator('h2[data-qa="account-created"]');
    // Locators used in Negative Tests
    this.errorMessage = page.locator('p:has-text("Email Address already exist!")');
    this.emailInput = page.locator('input[id="email"]');
  }

  async shouldBeOnSignUpPage() {
    await expect(this.page).toHaveURL(/\/signup/);
  }

  // Methods used for Positive Tests - Happy path
  async shouldBeOnCreatedAccountPage() {
    await expect(this.page).toHaveURL(/\/account_created/);
  }

  async verifySuccessfulRegistration() {
    if (!(await this.successMessage.isVisible())) {
      throw new Error('Registration success message not visible!');
    }
  }

  // Methods used for Negative Tests
  async verifySignUpErrorShown() {
    if (!(await this.errorMessage.isVisible())) {
      throw new Error('Sign Up error not shown for existing email!');
    }
  }

  async verifyEmailFieldIsDisabled() {
    if (!(await this.emailInput.isDisabled())) {
      throw new Error('Email input field is not disabled!');
    }
  }
}

module.exports = RegistrationAsserts;
