const { test } = require('@playwright/test');
const setupTestObjects = require('../../utils/setup Data copy');
const DataGenerator = require('../../utils/dataGenerator');

let pages, assertions;

test.describe('Registration - Negative Scenarios.', () => {
  test.beforeEach(async ({ page }) => {
    const setup = setupTestObjects(page);
    pages = setup.pages;
    assertions = setup.assertions;
  });

  test('Registration fails with already registered email.', async () => {
    try {
      await pages.homePage.navigate('/login');                      
      await assertions.loginAssert.shouldBeOnLoginPage();                   

      await pages.registrationPage.fillSignupFormInvalid('TestUserirGcTZ', 'user_1752002972197@test.com');
      await assertions.registrationAssert.verifySignUpErrorShown();
    } catch (e) {
      console.error('❌ Negative - Registration test failed:', e);
      throw e;
    }
  });

  test('Email field is not editable after being pre-populated on signup.', async () => {
    try {
      const randomEmail = DataGenerator.generateRandomEmail();
      const randomName = DataGenerator.generateRandomName();

      await pages.homePage.navigate('/login');                      
      await assertions.loginAssert.shouldBeOnLoginPage();     

      await pages.registrationPage.fillSignupForm(randomName, randomEmail);
      await assertions.registrationAssert.shouldBeOnSignUpPage();
      await assertions.registrationAssert.verifyEmailFieldIsDisabled();
    } catch (e) {
      console.error('❌ Negative - Registration test failed:', e);
      throw e;
    }
  });
});