import { test, expect } from '@playwright/test';

test('Playwright Special Locators ', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");

    await page.locator("div[class='form-group'] input[name='name']").fill("John Doe");
    await page.locator("//input[@name='email']").fill("johndoe@gmail.com");
    await page.getByPlaceholder("Password").fill("12345678");
    await page.locator("//input[@name='bday']").fill("1990-01-01");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    // default 5 seconds timeout for expect assertions to override the default timeout we can pass the timeout option/param in expect assertion
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000}); 


    await page.getByRole('link', { name: "Shop" }).click();

    // CSS Locator
    await page.locator("app-card").filter({ hasText: "Nokia Edge"}).getByRole("button", { name: "Add" }).click();
    await page.locator("//a[@class='nav-link btn btn-primary']").click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByText(" Thank you! Your order will be delivered in next few weeks :-).").isVisible();
})


test('Test Level Timeout', async({page}) => {

    const slowExpect = expect.configure({ timeout: 9000 }); // setting the timeout for all expect assertions in this test

    test.setTimeout(40000); // setting the timeout for this test to 20 seconds test level timeout will override the global timeout set in playwright.config.js

    page.setDefaultTimeout(9000); // setting the default timeout for all actions in this test to 9 seconds test level timeout will override the global timeout set in playwright.config.js
    
    // Global -> Test Level -> Step Level

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");

    await page.locator("div[class='form-group'] input[name='name']").fill("John Doe");
    await page.locator("//input[@name='email']").fill("johndoe@gmail.com");
    await page.getByPlaceholder("Password").fill("12345678");
    await page.locator("//input[@name='bday']").fill("1990-01-01");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    // default 5 seconds timeout for expect assertions
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();  // using the slowExpect configured timeout of 9 seconds


    await page.getByRole('link', { name: "Shop" }).click({timeout:15000}); // step level action timeout of 15 seconds for this click action will override the test level timeout of 40 seconds and global timeout of 30 seconds set in playwright.config.js

    await expect(page.locator(".my-4").first()).toHaveText("Shop");

    // CSS Locator
    await page.locator("app-card").filter({ hasText: "Nokia Edge"}).getByRole("button", { name: "Add" }).click();
    await page.locator("//a[@class='nav-link btn btn-primary']").click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByText(" Thank you! Your order will be delivered in next few weeks :-).").isVisible();
})