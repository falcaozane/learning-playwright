const {test, expect} = require('@playwright/test');

test('First Playwright Test', async ({browser})=>{
    // playwright code will go here
    const context = await browser.newContext();
    const page =  await context.newPage();
    // page.route('**/*.css', route =>route.abort()) // blocking css calls 
    // page.route('**/*.{jpg,jpeg,png}', route =>route.abort()) // block image calls
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(page.title())

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    // locators
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");

    const errorMessage = page.locator("[style*='block']");

    const cardTitles = page.locator(".card-title a");

    page.on('request', request => console.log(request.url())); // check all the requests
    page.on('response', response=> console.log(response.url(), response.status())) // checking all the responses

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

test('Third Playwright Test', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const radioBtn = page.locator(".radiotextsty").last();
    const checkBox = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");

    await username.fill("rahulshettyacademy")
    await password.fill("learning")
    await dropdown.selectOption("consult") // value , label, index
    await radioBtn.click();
    await page.locator("#okayBtn").click();
    console.log(await radioBtn.isChecked());
    await expect(radioBtn).toBeChecked();
    await checkBox.click();
    console.log(await checkBox.isChecked());
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    expect( await checkBox.isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    await signInBtn.click();

});

test('Fourth Playwright Test', async ({browser})=>{

    const context = await browser.newContext();
    const page =  await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink = page.locator("[href*='documents-request']");
    const username = page.locator("#username");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        await documentLink.click(), // Opens a new tab
    ]);

    const text = await newPage.locator(".red").textContent();
    console.log(text);

    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await username.fill(domain);
    
    await page.pause();
    


});