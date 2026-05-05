const { test, expect } = require('@playwright/test');

test('HP validations', async ({ page }) => {
    await page.goto('https://h20195.www2.hp.com/v2/library.aspx?doctype=95&footer=95&filter_doctype=no&showregionfacet=yes&filter_country=no&cc=us&lc=en&filter_oid=no&filter_prodtype=rw&prodtype=ij&showproductcompatibility=yes&showregion=yes&showreglangcol=yes&showdescription=yes%23doctype-95&sortorder-popular&teasers-off&isRetired-false&isRHParentNode-false&titleCheck-false#doctype-95&sortorder-popular&teasers-off&isRetired-false&isRHParentNode-false&titleCheck-false');

    const searchBox = page.locator('#txtSearch');
    await searchBox.fill('HP ZBook Fury 16 G11');

    const searchBtn = page.locator("//a[text()='Go']");
    await searchBtn.click();

    // Wait for NEW search result
    await page.waitForSelector('td.docuname a:has-text("ZBook Fury 16 G11")');

    const rows = page.locator('tbody#data tr.withsnippet');
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
        const row = rows.nth(i);

        // Product name
        const name = await row.locator('td.docuname a').innerText();

        // PDF link (first anchor inside docuaction)
        const link = await row.locator('td.docuaction a[href*="GetDocument"]').first().getAttribute('href');

        // Convert to full URL
        const fullLink = new URL(link, page.url()).href;

        console.log(`Product: ${name}`);
        console.log(`PDF Link: ${fullLink}`);
        console.log('----------------------');
    }
});