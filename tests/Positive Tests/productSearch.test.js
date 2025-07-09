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

      const allProducts = await pages.productPage.getAllProductNames();
      const randomIndex = Math.floor(Math.random() * allProducts.length);
      const randomProduct = allProducts[randomIndex];
      await pages.productPage.searchProduct(randomProduct);
      await assertions.productAssert.verifyProductVisible(randomProduct);  

      const productInfo = await assertions.cartAssert.getProductInfoByName(randomProduct);

      await pages.productPage.addToCart();
      await assertions.productAssert.shouldBeOnProductDetailsPage();  
      await assertions.productAssert.verifyProductSuccessfullyAdded();  
      await assertions.productAssert.verifyAddToCartConfirmationMessage();

      await pages.productPage.goToCart();
      await assertions.cartAssert.shouldBeOnCartPage();
      
      const quantity = 1;
      const numericPrice = parseInt(productInfo.price.replace(/[^\d]/g, ''), 10);
      const totalPrice = `Rs. ${numericPrice * quantity}`;
      await assertions.cartAssert.verifyCartItem({name: productInfo.name, price: productInfo.price, quantity: quantity, totalPrice: totalPrice }); 
    } catch (e) {
      console.error('❌ Add Product test failed:', e);
      throw e;
    }
  });
});