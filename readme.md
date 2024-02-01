# README

This repository contains the assignments and solutions for the QA Assessment.

## Folder Structure

        .
    TAKEHOME - Root Directory
        |-- ProblemStatements
        │   ├── backend.md 
        │   ├── dataengineer.md
        │   ├── fullstack.md
        │   └── qa.md 
        ├── Solution
        │   ├── testcases.md
        │   ├── testplandocument.md
        │   └── teststratergydocument.md
        ├── tests
        │   ├── automated-tests.spec.ts
        ├── package-lock.json
        ├── package.json
        └── readme.md

## Details

- **ProblemStatement  (The problem statements for the QA assignments can be found in this folder.)**
  - ~~backend.md (Problem statement for the backend assignment) - Ignore this file~~
  - ~~frontend.md (Problem statement for the frontend assignment) - Ignore this file~~
  - ~~fullstack.md (Problem statement for the fullstack assignment) - Ignore this file~~
  - ==qa.md (Problem statement for the QA assignment) - This is the file I need to refer to.==
- **Solution (The solutions for the QA assignments can be found in this folder.)**
  - [x] teststratergydocument.md (Contains the test strategy document for the QA assignment)
  - [x] testplandocument.md (Contains the test plan document for the QA assignment)
  - [x] testcases.md (Contains the test cases for the QA assignment)
  - [x] automated-tests.spec.ts (Contains the automated test scripts for the QA assignment)

**Part 1: Test Planning**

- This part contains 2 documents which you can find inside the Solution folder, namely:
  - **==teststratergydocument.md==** (Contains the test strategy document for the QA assignment)
  - **==testplandocument.md==** (Contains the test plan document for the QA assignment)

**Part 2: Test Case Design**

- You can find the test cases in the file
  - **==testcases.md==** (Contains the test cases for the QA assignment)
    - These test cases cover a brief range of scenarios to ensure crutial functionalitys are tested for the E-Commerce Website's.

**Part 3: Test Automation**

- **Test Automation Framework**
  - I have chosen ==Playwright== as the test automation framework for its modern design, cross-browser support, and powerful automation capabilities.

- **Framework Overview**:
  - Playwright is a cutting-edge open-source automation framework designed for web browsers.
  - It provides a unified API to automate Chromium, Firefox, and WebKit browsers, making it highly versatile.
  - Playwright's architecture includes components such as Playwright Core, Playwright CLI, and language bindings for seamless integration with various programming languages.
  - The decision to use Playwright is motivated by its:
    - ==Versatility:== Playwright supports multiple browsers, ensuring comprehensive cross-browser testing.
    - ==Modern Design:== With a focus on modern web development practices, Playwright stays relevant with the latest technologies.
    - ==Ease of Use:== Playwright's unified API and clear documentation make it accessible for both beginners and experienced developers.
    - ==Multi-language Support:== It provides bindings for various programming languages, including JavaScript, TypeScript, Python, and others.
    - By adopting Playwright, we aim to streamline the automation process, enhance test coverage, and ensure the robustness of the e-commerce website across different browsers.

**Install Playwright**
==System Requirements==

- ==Node.js 16+==
- ==Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).==
- ==MacOS 12 Monterey, MacOS 13 Ventura, or MacOS 14 Sonoma.==
- ==Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, with x86-64 or arm64 architecture.==

Run the install command

```shell
npm init playwright@latest
```

- **Automated Test Script Example**
Below you can find one of the example of the script:

**User Registration Scenario:**

```javascript
// Playwright script for User Registration
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
// Navigate to the registration page
  await page.goto('https://ecommercewebsite.com/register');
// Positive Case - Successful Registration
  await page.fill('#name', 'John Doe');
  await page.fill('#email', 'john.doe@example.com');
  await page.fill('#password', 'securepassword');
  await page.click('button[type="submit"]');
// Verify successful registration
  await page.waitForSelector('.success-message');
// Negative Case - Invalid Email Format
  await page.fill('#name', 'Jane Doe');
  await page.fill('#email', 'invalidemail');
  await page.fill('#password', 'anotherpassword');
  await page.click('button[type="submit"]');
  // Verify error message for invalid email format
  await page.waitForSelector('.error-message');
  await browser.close();
})();   
```

This example Playwright scripts demonstrate the automation of test scenarios for User Registration.

**Running the Example Test**

```shell
npx playwright test
```

