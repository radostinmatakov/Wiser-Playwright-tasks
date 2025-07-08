class BasePage {
  constructor(page) {
    this.page = page;
    this.logo = page.locator("//img[@alt='Website for automation practice']");
    this.consentButton = page.locator('button[aria-label="Consent"]');
  }

  async navigate(path = '/') {
    await this.page.goto(path);
    await this.logo.waitFor({ state: 'visible' });
    if (await this.consentButton.isVisible()) {
      await this.consentButton.click();
    }
  }
}

module.exports = BasePage;