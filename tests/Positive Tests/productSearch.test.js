const { test } = require('@playwright/test');
const setupTestObjects = require('../../utils/setup Data copy');

let pages, assertions;

test.describe('Search and Add a Product to Cart.', () => {
  test.beforeEach(async ({ page }) => {
    const setup = setupTestObjects(page);
    pages = setup.pages;
    assertions = setup.assertions;
  });

  test('Test the search functionality and cart behavior.', async () => {
    try {
      await pages.homePage.navigate();                      
      await pages.homePage.goToProducts(); 
      await assertions.productAssert.shouldBeOnProductPage();                   

      await pages.productPage.searchProduct('Pure Cotton V-Neck T-Shirt');
      await assertions.productAssert.verifyProductVisible();  

      await pages.productPage.addToCart();
      await assertions.productAssert.shouldBeOnProductDetailsPage();  
      await assertions.productAssert.verifyProductSuccessfullyAdded();  
      await assertions.productAssert.verifyAddToCartConfirmationMessage();

      await pages.productPage.goToCart();
      await assertions.cartAssert.shouldBeOnCartPage();       
      await assertions.cartAssert.verifyCartItem({name: 'Pure Cotton V-Neck T-Shirt',price: 'Rs. 1299',quantity: 1,}); 
    } catch (e) {
      console.error('❌ Add Product test failed:', e);
      throw e;
    }
  });
});