const { test, expect } = require('@playwright/test');

test('HP validations', async ({ page }) => {
    await page.goto('https://h20195.www2.hp.com/v2/library.aspx?doctype=95&footer=95&filter_doctype=no&showregionfacet=yes&filter_country=no&cc=us&lc=en&filter_oid=no&filter_prodtype=rw&prodtype=ij&showproductcompatibility=yes&showregion=yes&showreglangcol=yes&showdescription=yes%23doctype-95&sortorder-popular&teasers-off&isRetired-false&isRHParentNode-false&titleCheck-false#doctype-95&sortorder-popular&teasers-off&isRetired-false&isRHParentNode-false&titleCheck-false');

    const searchBox = page.locator('#txtSearch');
    await searchBox.fill('HP ZBook Fury 16 G11');

    const searchBtn = page.locator("//a[text()='Go']");
    await searchBtn.click();

    // Wait for results to load (table rows appear)
    await page.waitForSelector('td.docuname a');

    // Get all matching elements
    const products = page.locator('td.docuname a');
    const count = await products.count();

    for (let i = 0; i < count; i++) {
        const product = products.nth(i);

        const name = await product.innerText();
        const link = await product.getAttribute('href');

        console.log(`Product: ${name}`);
        console.log(`Link: ${link}`);
        console.log('----------------------');
    }
});