const {test, expect} = require('@playwright/test');
const { threadCpuUsage } = require('node:process');

test('First Playwright Test', async ({browser})=>{
    // playwright code will go here
    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(page.title())

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    // locators
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");

    const errorMessage = page.locator("[style*='block']");

    const cardTitles = page.locator(".card-title a");


    await username.fill("rahulshetty")
    await password.fill("learning")
    await signInBtn.click();
    console.log(await errorMessage.textContent())

    await expect(errorMessage).toContainText("Incorrect username/password")

    await username.fill("")
    await username.fill("rahulshettyacademy")
    await signInBtn.click();

    await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");
    
    // console.log(await cardTitles.nth(0).textContent()) // iphone X
    // console.log(await cardTitles.first().textContent()) // iphone X

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});

test('Second Playwright Test', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    // get title assertion
    console.log(await page.title())

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

});