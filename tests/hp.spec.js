const {test, expect} = require('@playwright/test')

test('HP validations', async ({page}) => {
    await page.goto('https://h20195.www2.hp.com/v2/library.aspx?doctype=95&footer=95&filter_doctype=no&showregionfacet=yes&filter_country=no&cc=us&lc=en&filter_oid=no&filter_prodtype=rw&prodtype=ij&showproductcompatibility=yes&showregion=yes&showreglangcol=yes&showdescription=yes%23doctype-95&sortorder-popular&teasers-off&isRetired-false&isRHParentNode-false&titleCheck-false#doctype-95&sortorder-popular&teasers-off&isRetired-false&isRHParentNode-false&titleCheck-false')
    const searchBox = page.locator("#txtSearch")
    searchBox.fill("HP ZBook Fury 16 G11")
    const searchBtn = page.locator("//a[text()='Go']")
    searchBtn.click()
    page.waitForTimeout(5000) // Wait for search results to load
    
})