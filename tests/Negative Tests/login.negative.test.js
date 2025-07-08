const { test } = require('@playwright/test');
const setupTestObjects = require('../../utils/setup Data copy');

let pages, assertions;

test.describe('Login - Negative Scenarios.', () => {
  test.beforeEach(async ({ page }) => {
    const setup = setupTestObjects(page);
    pages = setup.pages;
    assertions = setup.assertions;
  });

  test('Login fails with incorrect credentials.', async () => {
    try {
        await pages.homePage.navigate('/login');
        await assertions.loginAssert.shouldBeOnLoginPage(); 

        await pages.loginPage.login('invalid@mail.com', 'wrongpassword');
        await assertions.loginAssert.verifyLoginErrorMessage();
    } catch (e) {
        console.error('❌ Negative - Login test failed:', e);
        throw e;
    }
  });
});