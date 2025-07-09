const { test } = require('@playwright/test');
const setupTestObjects = require('../../utils/setup Data copy');
const DataGenerator = require('../../utils/dataGenerator');

let pages, assertions;

test.describe('Validate User Registration Process.', () => {
  test.beforeEach(async ({ page }) => {
    const setup = setupTestObjects(page);
    pages = setup.pages;
    assertions = setup.assertions;
  });

  test('Test the user registration flow. Successful Registration.', async () => {
    try {
      const randomEmail = DataGenerator.generateRandomEmail();
      const randomPassword = DataGenerator.generateRandomPassword();
      const randomName = DataGenerator.generateRandomName();

      await pages.homePage.navigate();                      
      await pages.homePage.goToLogin(); 
      await assertions.loginAssert.shouldBeOnLoginPage();                   

      await pages.registrationPage.fillSignupForm(randomName, randomEmail);
      await assertions.registrationAssert.shouldBeOnSignUpPage(); 
      await pages.registrationPage.completeAccountDetails(randomPassword);

      await assertions.registrationAssert.verifySuccessfulRegistration();
      await assertions.registrationAssert.shouldBeOnCreatedAccountPage(); 

    } catch (e) {
      console.error('❌ Registration test failed:', e);
      throw e;
    }
  });
});