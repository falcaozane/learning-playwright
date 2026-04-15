import { test, expect } from '@playwright/test';

test("Calendar Validation", async({page}) => {
    const monthNumber = "8" // August
    const yearNumber = "2024"
    const dateNumber = "21" // 21st

    const expectedDate = [monthNumber, dateNumber, yearNumber] // 08/21/2024

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker__inputGroup') .click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(yearNumber).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click(); // 0-11 array-  
    await page.locator("//abbr[text()='"+dateNumber+"']").click();

    // validation
    const dateInputs = page.locator('.react-date-picker__inputGroup__input');
    for(let i=0; i<expectedDate.length; i++){
        const value = await dateInputs.nth(i).inputValue();
        expect(value).toBe(expectedDate[i]);
    }

})