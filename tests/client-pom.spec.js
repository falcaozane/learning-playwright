const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashBoardPage } = require('../pageObjects/DashBoardPage');

 
 
 
 
test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const username = "zanefalcao21@gmail.com";
   const password = "password";
   const productName = 'ZARA COAT 3';

   const loginPage = new LoginPage(page);
   const dashboardPage = new DashBoardPage(page);

   await loginPage.goTo();
   await loginPage.landOnLoginPage();
   await loginPage.validateLogin(username, password);

   await dashboardPage.searchProduct(productName);
   await dashboardPage.navigateToCart();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
   await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   // await page.pause();
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});
