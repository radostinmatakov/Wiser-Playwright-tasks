const HomePage = require('../pageObjects/homePage');
const LoginPage = require('../pageObjects/login.logoutPage');
const RegistrationPage = require('../pageObjects/registrationsPage');
const ProductPage = require('../pageObjects/productPage');

const LoginLogoutAsserions = require('../assertions/assertionsLogin.Logout');
const RegistrationAsserts = require('../assertions/assertionsRegistrations');
const ProductSearchAsserts = require('../assertions/assertionsProductSearch');
const CartAsserts = require('../assertions/assertionsCart');

function setupTestObjects(page) {
  return {
    pages: {
      homePage: new HomePage(page),
      loginPage: new LoginPage(page),
      registrationPage: new RegistrationPage(page),
      productPage: new ProductPage(page),
    },
    assertions: {
      loginAssert: new LoginLogoutAsserions(page),
      registrationAssert: new RegistrationAsserts(page),
      productAssert: new ProductSearchAsserts(page),
      cartAssert: new CartAsserts(page),
    },
  };
}

module.exports = setupTestObjects;