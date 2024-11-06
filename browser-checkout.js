import { browser } from 'k6/browser';
import { check } from 'k6';
import { sleep } from 'k6';


export const options = {
  scenarios: {
    BrowserCheckOutScenario: {
        executor: 'constant-vus',
        vus: 1,
        duration: "1m",   
            options: {
        browser: {
          type: 'chromium', 
        },
      },
    },
  }
}

export default async function () {
    // Initiate a new browser
    const context = await browser.newContext();
    const page = await context.newPage();

    // Go to homepage
    await page.goto('https://liamseprod.wpenginepowered.com/');
    //page.screenshot({ path: 'screenshots/1_homepage.png' });
    sleep(3);

    // Go to product page
    await page.goto('https://liamseprod.wpenginepowered.com/products/');
    sleep(3);
    //page.screenshot({ path: 'screenshots/2_productpage.png' });

    // Click on first product on product page https://liamseprod.wpenginepowered.com/products/ 
    const ClickOnProduct = page.locator('//*[@id="genesis-content"]/article/div/div/ul/li[1]/a[1]/img');
    await Promise.all([page.waitForNavigation(), ClickOnProduct.click()]);
    sleep(3);
    //page.screenshot({ path: 'screenshots/3_AllProducts.png' });

    // Selection quantity (come back to this)      
    // const quantityOption = page.locator('//*[@id="quantity_65314b2530ec4"]');
    // quantityOption.selectOption('2');

    // Click Add to Basket on https://liamseprod.wpenginepowered.com/product/test-prod-one/
    const AddToBasket = page.locator('//*[@id="product-47"]/div[2]/form/button');
    await Promise.all([page.waitForNavigation(), AddToBasket.click()]);
    sleep(3);
    //page.screenshot({ path: 'screenshots/4_AddToCart.png' });

    // Add Checks to verify user input (come back to this)
    // check(page, {
    //     'cart item name' : page => page.locator('//p[text()="Test Product 1"]').isVisible() === true ,
    //     'cart item quantity' : page => page.locator('//p[text()="3"]').isVisible() === true 
    
    // }
    // )


    // View Basket https://liamseprod.wpenginepowered.com/cart/
    const viewBasket = page.locator('//*[@id="genesis-content"]/div[1]/div/a');
    await Promise.all([page.waitForNavigation(), viewBasket.click()]);
    sleep(3);
    //page.screenshot({ path: 'screenshots/5_ViewBasket.png' });

    // Proceed to Checkout https://liamseprod.wpenginepowered.com/checkout/
    const proceedToCheckout = page.locator('//*[@id="genesis-content"]/article/div/div/div[2]/div/div/a');
    await Promise.all([page.waitForNavigation(), proceedToCheckout.click()]);
    sleep(3);
    //page.screenshot({ path: 'screenshots/6_Checkout.png' });

    // Enter Shipping Information
    page.locator('input[name="billing_first_name"]').type('FirstName');
    sleep(.1);
    page.locator('input[name="billing_last_name"]').type('LastName');
    // sleep(.1);
    // page.locator('input[name="billing_country"]').type('United Kingdom (UK)');
    sleep(.1);
    page.locator('input[name="billing_address_1"]').type('TEST-HOUSE, TEST-PLACE');
    sleep(.1);
    page.locator('input[name="billing_city"]').type('TEST-CITY');
    sleep(.1);
    page.locator('input[name="billing_state"]').type('');
    sleep(.1);
    page.locator('input[name="billing_postcode"]').type('AA901XX');
    sleep(.1);
    page.locator('input[name="billing_phone"]').type('0000000000');
    sleep(.1);
    page.locator('input[name="billing_email"]').type('test@test.com');
    //page.screenshot({ path: 'screenshots/7_Shipping_Info.png' });

    // Click on the place order button
    const placeOrderButton = page.locator('//*[@id="place_order"]');
    await Promise.all([page.waitForNavigation(), placeOrderButton.click()]);
    //page.screenshot({ path: 'screenshots/8_Order_Placed.png'});

    // Sleep
    sleep(3);
    // Close the browser
    page.close();
  }