const {test, expect} = require('@playwright/test')

test('Popup validations', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    // await page.goto('https://google.com')
    // await page.goBack()
    // await page.goForward()

    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('#displayed-text')).toBeHidden()

    page.on('dialog', dialog => dialog.accept())

    await page.locator('#confirmbtn').click()
    await page.locator('#mousehover').hover()
    await page.locator('text=Reload').click()

    const framesPage = page.frameLocator('#courses-iframe')
    await framesPage.locator("li a[href*='lifetime-access']:visible").click()
    const subs = await framesPage.locator('.text h2').textContent()
    console.log(subs.split(" ")[1])
})

test( "Screenshot and Visual Comparison", async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#displayed-text').screenshot({path:"screenshot_element.png"})
    await page.locator('#hide-textbox').click()
    await page.screenshot({path:"screenshot.png"})
    await expect(page.locator('#displayed-text')).toBeHidden()
})

// screenshot1 -> store -> screenshot2 compare screenshots for visual testing

test('visual', async({page})=>{

    await page.goto("https://google.com/")
    expect(await page.screenshot()).toMatchSnapshot('landing-win32.png')
})