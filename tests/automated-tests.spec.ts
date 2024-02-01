/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { chromium } from 'playwright';
import * as testData from '/workspaces/takehome/testdata.json';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseURL = 'https://new-ella-demo.myshopify.com/';

  const userRegistrationData = testData.userRegistration;
  const productSearchData = testData.productSearch;

  // Test Case 1: User Registration - Positive Case
  await page.goto(baseURL + 'account/register');
  await page.fill('#FirstName', userRegistrationData.validUser.firstName);
  await page.fill('#LastName', userRegistrationData.validUser.lastName);
  await page.fill('#Email', userRegistrationData.validUser.email);
  await page.fill('#Password', userRegistrationData.validUser.password);
  await page.fill('#PasswordConfirmation', userRegistrationData.validUser.password);
  await page.click('button[type="submit"]');
  await page.waitForSelector('.success-message');

  // Test Case 2: User Registration - Negative Case (Invalid Email Format)
  await page.goto(baseURL + 'account/register');
  await page.fill('#FirstName', userRegistrationData.invalidEmailUser.firstName);
  await page.fill('#LastName', userRegistrationData.invalidEmailUser.lastName);
  await page.fill('#Email', userRegistrationData.invalidEmailUser.email);
  await page.fill('#Password', userRegistrationData.invalidEmailUser.password);
  await page.fill('#PasswordConfirmation', userRegistrationData.invalidEmailUser.password);
  await page.click('button[type="submit"]');
  await page.waitForSelector('.error-message');

  // Test Case 3: Product Search - Positive Case
  await page.goto(baseURL + 'search?q=' + productSearchData.existingProduct);
  await page.waitForSelector('.product-item');

  // Test Case 4: Product Search - Negative Case (Non-existent Product)
  await page.goto(baseURL + 'search?q=' + productSearchData.nonexistentProduct);
  await page.waitForSelector('.no-results-message');

  // Continue with the rest of the test cases...

  await browser.close();
})();
