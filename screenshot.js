const playwright = require('playwright-core');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  // Navigate to the application
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Wait a bit for any dynamic content to load
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({
    path: 'public/screenshot.png',
    fullPage: true
  });

  console.log('Screenshot saved to public/screenshot.png');

  await browser.close();
})();
