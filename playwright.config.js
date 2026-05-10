// @ts-check

const { trace } = require("node:console");


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',

  timeout: 30 * 1000,
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
  },
  
});

module.exports = config;

