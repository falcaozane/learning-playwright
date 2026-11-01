const base = require('@playwright/test');
const { request} = require('@playwright/test');

const loginPayload = {userEmail : "zanefalcao21@gmail.com", userPassword : ""};

const orderPayload = {orders : [{country : "India", productOrderedId : "6960eae1c941646b7a8b3ed3"}]};

const {APiUtils} = require('./APiUtils');

exports.customtest = base.test.extend(

    {

        authenticatedPage: async ({browser},use) => {

            const context = await browser.newContext()
            const page = await context.newPage();
            const email = "zanefalcao21@gmail.com";
            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator("#userEmail").fill(email);
            await page.locator("#userPassword").fill("");
            await page.locator("#login").click();
            await page.waitForLoadState('networkidle');
            await use(page);
        },

        createOrder: async ({},use) => {

            const apiContext = await request.newContext();
            const apiUtils = new APiUtils(apiContext, loginPayload)
            const response = await apiUtils.createOrder(orderPayload);
            await use(response);
            await apiContext.dispose();
        }

    }
)

