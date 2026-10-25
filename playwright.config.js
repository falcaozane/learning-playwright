// @ts-check

const { trace } = require("node:console");


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',

  timeout: 30 * 1000, // Maximum time one test can run for.

  expect:{
    timeout: 5000,
  },

  reporter: 'html',

  
  use: {
    browserName:'chromium',
    headless: false,
    viewport: null, // Set viewport to null to allow maximization
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: ['--start-maximized'], // Use the start-maximized argument
    },
    screenshot: 'on',
    trace: 'on', // retain-on-failure, off, on, on-first-retry, on-all-retries

    actionTimeout: 10*1000, // Global action timeout for all actions like click, fill, etc. If the action takes longer than this time, the test will fail.
    navigationTimeout: 30*1000, // Global navigation timeout for all navigation actions like goto, reload, etc. If the navigation takes longer than this time, the test will fail.
  },
  
});

module.exports = config;

