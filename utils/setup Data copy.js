const HomePage = require('../pageObjects/homePage');
const LoginPage = require('../pageObjects/login.logoutPage');
const RegistrationPage = require('../pageObjects/registrationsPage');

const HomeAssertions = require('../assertions/assertionsLogin.Logout');
const LoginLogoutAsserions = require('../assertions/assertionsLogin.Logout');
const RegistrationAsserts = require('../assertions/assertionsRegistrations');

function setupTestObjects(page) {
  return {
    pages: {
      homePage: new HomePage(page),
      loginPage: new LoginPage(page),
      registrationPage: new RegistrationPage(page),

    },
    assertions: {
      homeAssert: new HomeAssertions(page),
      loginAssert: new LoginLogoutAsserions(page),
      registrationAssert: new RegistrationAsserts(page),
    },
  };
}

module.exports = setupTestObjects;