const { test, expect , request} = require('@playwright/test');
const {customtest} = require('../tests/utils/fixtures.js');



customtest('Fixtues Demo', async ({ authenticatedPage, createOrder }) => {

    // login to the application and verify if the order is created

    await authenticatedPage.goto('https://rahulshettyacademy.com/client');
    await authenticatedPage.locator("nav [routerLink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();

})