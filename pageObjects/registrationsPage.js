const BasePage = require('./basePage');

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators used in Positive Tests - Happy path
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.genderMrRadio = page.locator('input[id="id_gender1"]');
    this.passwordInput = page.locator('input[id="password"]');
    this.dayInput = page.locator('select[id="days"]');
    this.monthInput = page.locator('select[id="months"]');
    this.yearInput = page.locator('select[id="years"]');
    this.firstNameInput = page.locator('input[id="first_name"]');
    this.lastNameInput = page.locator('input[id="last_name"]');
    this.addressInput = page.locator('input[id="address1"]');
    this.countrySelect = page.locator('select[id="country"]');
    this.stateInput = page.locator('input[id="state"]');
    this.cityInput = page.locator('input[id="city"]');
    this.zipcodeInput = page.locator('input[id="zipcode"]');
    this.mobileInput = page.locator('input[id="mobile_number"]');
    this.createButton = page.locator('button[data-qa="create-account"]');
  }

  // Methods used for Positive Tests - Happy path
  async fillSignupForm(name, email) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }

  async completeAccountDetails(password) {
    await this.genderMrRadio.check();
    await this.passwordInput.fill(password);
    await this.dayInput.selectOption({ value: '15' }); 
    await this.monthInput.selectOption({ value: '3' }); 
    await this.yearInput.selectOption({ value: '1994' }); 
    await this.firstNameInput.fill('John');
    await this.lastNameInput.fill('Doe');
    await this.addressInput.fill('123 Street');
    await this.countrySelect.selectOption('New Zealand');
    await this.stateInput.fill('Ontario');
    await this.cityInput.fill('Toronto');
    await this.zipcodeInput.fill('123456');
    await this.mobileInput.fill('1234567890');
    await this.createButton.click();
  }

  // Methods used for Negative Tests 
  async fillSignupFormInvalid(name, email) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }
}

module.exports = RegistrationPage;