// Add or update the header of this file.

import { test, expect } from '@playwright/test';

(async () => {
    const baseURL = 'https://new-ella-demo.myshopify.com/';
    // Define constant for register URL
    const registerURL = `${baseURL}account/register`;
    const errorMessageSelector = '.error-message';
    const productItemSelector = '.product-item';
    const successMessageSelector = '.success-message';

    test.describe('Automated Tests', () => {
        let page;

        test.beforeEach(async ({ browser }) => {
            const context = await browser.newContext();
            page = await context.newPage();
        });

        test.afterEach(async () => {
            await page.close();
        });
        // Test Case 1: User Registration - Positive Case
        test('User Registration - Positive Case', async () => {
            page.goto(registerURL);
            page.fill('#FirstName', 'John');
            page.fill('#LastName', 'Doe');
            page.fill('#Email', 'testerlastname@gmail.com');
            page.fill('#Password', 'securepassword');
            page.fill('#PasswordConfirmation', 'securepassword');
            await expect(page).toHaveText('submit');
            page.click('button[type="submit"]');
            await page.waitForSelector(successMessageSelector);
        });
        // Test Case 2: User Registration - Negative Case (Invalid Email Format)
        test('User Registration - Negative Case (Invalid Email Format)', async () => {
            page.goto(registerURL);
            page.fill('#FirstName', 'Jane');
            page.fill('#LastName', 'Doe');
            page.fill('#Email', 'invalidemail');
            page.fill('#Password', 'anotherpassword');
            page.fill('#PasswordConfirmation', 'anotherpassword');
            page.click('button[type="submit"]');
            page.waitForSelector(errorMessageSelector);
        });
        // Test Case 3: Product Search - Positive Case
        test('Product Search - Positive Case', async () => {
            page.goto(`${baseURL}search?q=Product Name`);
            page.waitForSelector(productItemSelector);
        });
        // Test Case 4: Product Search - Negative Case (Non-existent Product)
        page.goto(`${baseURL}search?q=Nonexistent Product`);
        page.waitForSelector('.no-results-message');

        // Test Case 5: Adding Items to Cart - Positive Case
        page.goto(`${baseURL}products/sample-product`);
        page.click('button.add-to-cart');
        page.waitForSelector('.cart-item');

        // Test Case 6: Adding Items to Cart - Negative Case (Insufficient Stock)
        page.goto(`${baseURL}products/limited-stock-product`);
        page.fill('input.quantity', '1000');
        page.click('button.add-to-cart');
        page.waitForSelector('.error-message');

        // Test Case 7: Checkout Process - Positive Case
        page.goto(`${baseURL}cart`);
        page.click('button[name="checkout"]');
        page.fill('#checkout_email', 'testerlastname@gmail.com');
        page.click('button[type="submit"]');
        page.fill('#checkout_shipping_address_first_name', 'John');
        page.fill('#checkout_shipping_address_last_name', 'Doe');
        page.fill('#checkout_shipping_address_address1', '123 Main Street');
        page.fill('#checkout_shipping_address_city', 'City');
        page.fill('#checkout_shipping_address_zip', '12345');
        page.fill('#checkout_shipping_address_phone', '1234567890');
        page.click('button[name="button"]');
        page.waitForSelector('.order-status');

        // Test Case 8: Checkout Process - Negative Case (Empty Cart)
        page.goto(`${baseURL}cart`);
        page.click('button[name="checkout"]');
        page.click('button[type="submit"]');
        page.waitForSelector('.error-message');

        // Test Case 9: Order Management - Positive Case (Successful Order Tracking)
        page.goto(`${baseURL}account/orders`);
        page.waitForSelector('.order-item');
        const orderId = page.innerText('.order-item');
        page.goto(`${baseURL}account/track/${orderId}`);
        page.waitForSelector('.order-status');

        // Test Case 10: Order Management - Negative Case (Non-existent Order Tracking)
        page.goto(`${baseURL}account/track/invalidorder`);
        page.waitForSelector('.no-results-message');

        // Test Case 11: User Registration - Edge Case (Maximum Characters in Name Field)
        page.goto(`${baseURL}account/register`);
        page.fill('#FirstName', 'A'.repeat(255)); // Maximum allowed characters
        page.fill('#LastName', 'Doe');
        page.fill('#Email', 'user@example.com');
        page.fill('#Password', 'securepassword');
        page.fill('#PasswordConfirmation', 'securepassword');
        page.click('button[type="submit"]');
        page.waitForSelector('.success-message');
        
        // Test Case 12: User Registration - Boundary Case (Minimum and Maximum Characters in Password Field)
        page.goto(`${baseURL}account/register`);
        page.fill('#FirstName', 'Jane');
        page.fill('#LastName', 'Doe');
        page.fill('#Email', 'user@example.com');
        // Minimum allowed characters
        page.fill('#Password', 'A'.repeat(6));
        // Maximum allowed characters
        page.fill('#PasswordConfirmation', 'A'.repeat(30)); 
        page.click('button[type="submit"]');
        page.waitForSelector('.success-message');

        // Test Case 13: Product Search - Edge Case (Search with Maximum Number of Characters)
        // Maximum allowed characters
        page.goto(`${baseURL}search?q=${'A'.repeat(500)}`);
        page.waitForSelector('.product-item');

        // Test Case 14: Product Search - Boundary Case (Search with Single Character)
        // Single character
        page.goto(`${baseURL}search?q=A`); 
        page.waitForSelector('.product-item');

        // Test Case 15: Adding Items to Cart - Edge Case (Maximum Allowed Quantity in Cart)
        page.goto(`${baseURL}products/sample-product`);
        // Maximum allowed quantity
        page.fill('input.quantity', '10'); 
        page.click('button.add-to-cart');
        page.waitForSelector('.cart-item');

        // Test Case 16: Adding Items to Cart - Boundary Case (Attempt to Add Items with Negative Quantity)
        page.goto(`${baseURL}products/sample-product`);
         // Negative quantity
        page.fill('input.quantity', '-1');
        page.click('button.add-to-cart');
        page.waitForSelector('.error-message');

        // Close the browser
        page.browser.close();
    });
});
