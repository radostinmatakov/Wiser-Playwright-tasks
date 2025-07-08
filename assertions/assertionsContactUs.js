const { expect } = require('@playwright/test');

class AssertionsContactUs {
  constructor(page) {
    this.page = page;
    this.messageField = page.locator('textarea[name="your-message"]');
    this.emailField = page.locator('input[name="your-email"]');
    this.sendButton = page.locator('(//input[@type="submit"])[1]');
    this.requiredFieldsErrorMessage = page.locator('//div[normalize-space()="One or more fields have an error. Please check and try again."]');
    this.reCAPTCHAErrorMessage = page.locator('//span[normalize-space()="Please verify that you are not a robot."]');
    this.contactUstitle = page.locator('h1.heading_title');
  }

  async shouldHaveAnyContactElement() {
    const messageVisible = await this.messageField.isVisible();
    const emailVisible = await this.emailField.isVisible();
    const buttonVisible = await this.sendButton.isVisible();

    const found = messageVisible || emailVisible || buttonVisible;

    expect(found).toBeTruthy();
  }

  async shouldShowCaptchaError() {
    await expect(this.reCAPTCHAErrorMessage).toBeVisible({ timeout: 5000 });
    await expect(this.reCAPTCHAErrorMessage).toHaveText(
      'Please verify that you are not a robot.'
    );
  }

  async shouldShowRequiredFieldsError() {
    await expect(this.requiredFieldsErrorMessage).toBeVisible({ timeout: 5000 });
    await expect(this.requiredFieldsErrorMessage).toHaveText(
      'One or more fields have an error. Please check and try again.'
    );
  }

  async shouldBeOnContactPage() {
    await expect(this.page).toHaveURL(/.*\/contact-us\/?/);
    await expect(this.contactUstitle).toBeVisible();
    await expect(this.contactUstitle).toHaveText(/contact us/i);
  }
}

module.exports = AssertionsContactUs;