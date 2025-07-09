const { test } = require('@playwright/test');
const setupTestObjects = require('../../utils/setup Data copy');

let pages, assertions;

test.describe('Test Login and Logout Functionality.', () => {
  test.beforeEach(async ({ page }) => {
    const setup = setupTestObjects(page);
    pages = setup.pages;
    assertions = setup.assertions;
  });

  test.afterEach(async ({ page }) => {
    try {
      const logoutLink = page.locator('a[href="/logout"]');
      if (await logoutLink.isVisible().catch(() => false)) {
        await logoutLink.click();
      }
      await page.context().clearCookies();
    } catch (e) {
      console.warn('⚠️ Teardown failed or unnecessary:', e.message);
    }
  });

  test('Validate Successful Login.', async () => {
    try {
      await pages.homePage.navigate();
      await pages.homePage.goToLogin();
      await assertions.loginAssert.shouldBeOnLoginPage(); 

      await pages.loginPage.login('user_1752002972197@test.com', '2BPn)$yY&8Zr');
      await assertions.loginAssert.verifyLoggedIn('TestUserirGcTZ');
    } catch (e) {
      console.error('❌ Login test failed:', e);
      throw e;
    }
  });

  test('Validate Successful Logout.', async () => {
    try {
      // Pre-conditions for Logout test
      await pages.homePage.navigate();
      await pages.homePage.goToLogin();
      await assertions.loginAssert.shouldBeOnLoginPage(); 
      await pages.loginPage.login('user_1752002972197@test.com', '2BPn)$yY&8Zr');

      await pages.loginPage.logout();
      await assertions.loginAssert.verifyLoggedOut();
      await assertions.loginAssert.shouldBeOnLoginPage();
    } catch (e) {
      console.error('❌ Logout test failed:', e);
      throw e;
    }
  });
});