const { test } = require('@playwright/test');
const XLSX = require('xlsx');

test('HP validations - Data Driven', async ({ page }) => {

    // 👉 Read Excel
    const workbook = XLSX.readFile('models.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const results = [];

    for (const rowData of data) {

        const model = rowData['Model Name'];
        console.log(`\nSearching for: ${model}`);

        await page.goto('https://h20195.www2.hp.com/v2/library.aspx?doctype=95&footer=95&filter_doctype=no&showregionfacet=yes&filter_country=no&cc=us&lc=en&filter_oid=no&filter_prodtype=rw&prodtype=ij&showproductcompatibility=yes&showregion=yes&showreglangcol=yes&showdescription=yes%23doctype-95&sortorder-popular&teasers-off&isRetired-false&isRHParentNode-false&titleCheck-false#doctype-95&sortorder-popular&teasers-off&isRetired-false&isRHParentNode-false&titleCheck-false');

        // Search
        await page.fill('#txtSearch', model);
        await page.click("//a[text()='Go']");

        await page.waitForTimeout(3000);

        const rows = page.locator('tbody#data tr.withsnippet');
        const count = await rows.count();

        let links = [];

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);

            const name = await row.locator('td.docuname a').innerText();

            if (name.toLowerCase().includes(model.toLowerCase())) {
                const link = await row
                    .locator('td.docuaction a[href*="GetDocument"]')
                    .first()
                    .getAttribute('href');

                if (link) {
                    const fullLink = new URL(link, page.url()).href;
                    links.push(fullLink);
                }
            }
        }

        // 👉 Handle result cases
        if (links.length === 0) {
            results.push({
                Model: model,
                Links: 'NOT FOUND'
            });
        } else {
            results.push({
                Model: model,
                Links: links.join('\n') // multiple links
            });
        }
    }

    // 👉 Write output Excel
    const newSheet = XLSX.utils.json_to_sheet(results);
    const newWorkbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Results');

    XLSX.writeFile(newWorkbook, 'output.xlsx');

    console.log('\n✅ Execution completed. Check output.xlsx');
});