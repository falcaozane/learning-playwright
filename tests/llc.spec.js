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
    await page.getByRole('link', { name: "Shop" }).click();

    await page.locator("app-card").filter({ hasText: "Nokia Edge"}).getByRole("button", { name: "Add" }).click();
    await page.locator("//a[@class='nav-link btn btn-primary']").click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByText(" Thank you! Your order will be delivered in next few weeks :-).").isVisible();
})
