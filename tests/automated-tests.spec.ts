

import { test, expect } from '@playwright/test';

let testData = require('./test-data.json');

test('User Registration - Positive Case', async ({ page }) => {

  const userRegistrationData = testData.userRegistration.validUser;

  // Navigate to the registration page.
  await page.goto('https://new-ella-demo.myshopify.com/account/register');

  // Fill in registration form with valid details.
  await page.fill('#FirstName', userRegistrationData.firstName);
  await page.fill('#LastName', userRegistrationData.lastName);
  await page.fill('#Email', userRegistrationData.email);
  await page.fill('#Password', userRegistrationData.password);
  await page.fill('#PasswordConfirmation', userRegistrationData.password);

  // Submit the registration form.
  await page.click('button[type="submit"]');

  // Expect a success message.
  await expect(page).toHaveURL('https://new-ella-demo.myshopify.com/');
});

test('User Registration - Negative Case (Invalid Email Format)', async ({ page }) => {
  const userRegistrationData = testData.userRegistration.invalidEmailUser;

  // Navigate to the registration page.
  await page.goto('https://new-ella-demo.myshopify.com/account/register');

  // Fill in registration form with invalid email format.
  await page.fill('#FirstName', userRegistrationData.firstName);
  await page.fill('#LastName', userRegistrationData.lastName);
  await page.fill('#Email', userRegistrationData.email);
  await page.fill('#Password', userRegistrationData.password);
  await page.fill('#PasswordConfirmation', userRegistrationData.password);

  // Submit the registration form.
  await page.click('button[type="submit"]');

  // Expect an error message.
  await expect(page).toHaveURL('https://new-ella-demo.myshopify.com/account/register');
});
