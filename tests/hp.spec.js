const { test, expect } = require('@playwright/test');
const XLSX = require('xlsx');
const path = require('path');

test('HP Bulk Validations', async ({ page }) => {
    // 1. Setup File Paths
    const inputFilePath = path.join(__dirname, 'models.xlsx');
    
    // 2. Read the Excel File
    const workbook = XLSX.readFile(inputFilePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert sheet data to JSON for easier manipulation
    const data = XLSX.utils.sheet_to_json(worksheet);

    // 3. Iterate through each model in the Excel file
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const modelName = row['Model Name'];

        // Skip if Model Name is empty
        if (!modelName) {
            row['Links'] = 'Skipped (No Model Name)';
            continue;
        }

        console.log(`Searching for: ${modelName}`);

        // Navigate to the page (Fresh load for each model ensures stability)
        await page.goto('https://h20195.www2.hp.com/v2/library.aspx?doctype=95&footer=95&filter_doctype=no&showregionfacet=yes&filter_country=no&cc=us&lc=en&filter_oid=no&filter_prodtype=rw&prodtype=ij&showproductcompatibility=yes&showregion=yes&showreglangcol=yes&showdescription=yes%23doctype-95&sortorder-popular&teasers-off&isRetired-false&isRHParentNode-false&titleCheck-false#doctype-95&sortorder-popular&teasers-off&isRetired-false&isRHParentNode-false&titleCheck-false');

        page.pause(); // Pause to allow manual inspection if needed (can be removed in production)

        // Perform Search
        const searchBox = page.locator('#txtSearch');
        await searchBox.fill(modelName);

        try {
            // Attempt to click the "Go" button with a short timeout
            const searchBtn = page.locator("//a[text()='Go']");
            await searchBtn.click({ timeout: 10000 });
        } catch (error) {
            // Fallback: Press 'Enter' in the search box if the button is missing or fails
            console.log('Search button not found or clickable, pressing Enter instead.');
            await searchBox.press('Enter');
        }

        // Wait for results to load.
        // We wait for the network to be idle to ensure the table is populated.
        // We wrap this in a try-catch to handle cases where "No Results" appears (table might not exist).
        try {

            // 1. Check for the "No matching documents" text immediately
            const noResultsMsg = page.getByText('No matching documents found. Please change the search term.', { exact: true });
            
            // We use a short wait to see if the message pops up
            const isNoResult = await noResultsMsg.isVisible({ timeout: 5000 }).catch(() => false);

            if (isNoResult) {
                row['Links'] = 'not found';
                console.log(`No results for: ${modelName}`);
                continue; // Skip to the next model in the Excel list
            }

            await page.waitForLoadState('networkidle');
            
            // Attempt to wait for the specific result row selector
            // If this times out, it implies no results were found.
            await page.waitForSelector('tbody#data tr.withsnippet', { timeout: 10000 });
        } catch (error) {
            // No results found logic handled below by checking count
            // If it times out and no specific "No result" message was found, mark as not found
            row['Links'] = 'not found';
            continue;
        }

        // Extract Links
        const rows = page.locator('tbody#data tr.withsnippet');
        const count = await rows.count();
        const links = [];

        if (count > 0) {
            for (let j = 0; j < count; j++) {
                const rowElement = rows.nth(j);

                // Check if the link element exists in this row
                const linkElement = rowElement.locator('td.docuaction a[href*="GetDocument"]').first();
                
                if (await linkElement.count() > 0) {
                    const href = await linkElement.getAttribute('href');
                    if (href) {
                        // Convert to full URL
                        const fullLink = new URL(href, page.url()).href;
                        links.push(fullLink);
                        console.log(`Found link: ${fullLink}`);
                    }
                }
            }
        }

        // 4. Update the data object
        if (links.length > 0) {
            // Join multiple links with a newline (Alt+Enter in Excel) or comma
            row['Links'] = links.join('\n'); 
        } else {
            row['Links'] = 'No result found';
        }
    }

    // 5. Write back to the Excel File
    // Create a new worksheet from the updated data
    const newWorksheet = XLSX.utils.json_to_sheet(data);
    
    // Overwrite the old worksheet
    workbook.Sheets[sheetName] = newWorksheet;
    
    // Write the file
    XLSX.writeFile(workbook, inputFilePath);
    
    console.log('Process completed. Output written to models.xlsx');
});



