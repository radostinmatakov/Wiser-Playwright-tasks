const { test } = require('@playwright/test');
const setupTestObjects = require('../../utils/setup Data copy');

let pages, assertions;

test.describe('Test Login and Logout Functionality.', () => {
  test.beforeEach(async ({ page }) => {
    const setup = setupTestObjects(page);
    pages = setup.pages;
    assertions = setup.assertions;
  });

  test('Validate the login and logout processes. Successful Login/Logout.', async () => {
    try {
        await pages.homePage.navigate();
        await pages.homePage.goToLogin();
        await assertions.loginAssert.shouldBeOnLoginPage(); 

        await pages.loginPage.login('user_1752002972197@test.com', '2BPn)$yY&8Zr');
        await assertions.loginAssert.verifyLoggedIn('TestUserirGcTZ');

        await pages.loginPage.logout();
        await assertions.loginAssert.verifyLoggedOut();
        await assertions.loginAssert.shouldBeOnLoginPage();
    } catch (e) {
        console.error('❌ Login/Logout test failed:', e);
        throw e;
    }
  });
});