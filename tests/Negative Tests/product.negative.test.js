const { test } = require('@playwright/test');
const setupTestObjects = require('../../utils/setup Data copy');

let pages, assertions;

test.describe('Products and Cart - Negative Scenarios.', () => {
  test.beforeEach(async ({ page }) => {
    const setup = setupTestObjects(page);
    pages = setup.pages;
    assertions = setup.assertions;
  });

  test('Quantity field is not editable after being pre-populated on Add Product to Cart.', async () => {
    try {
      await pages.homePage.navigate('/products');                   
      await assertions.productAssert.shouldBeOnProductPage();                   
      await pages.productPage.searchProduct('Pure Cotton V-Neck T-Shirt');

      await pages.productPage.addToCart();
      await assertions.productAssert.shouldBeOnProductDetailsPage();  
      await assertions.productAssert.verifyProductSuccessfullyAdded();  
      await assertions.productAssert.verifyAddToCartConfirmationMessage();

      await pages.productPage.goToCart();
      await assertions.cartAssert.shouldBeOnCartPage();     
      await assertions.cartAssert.verifyQuantityFieldIsDisabled(); 
    } catch (e) {
      console.error('❌ Quantity field is not editable test failed:', e);
      throw e;
    }
  });
});