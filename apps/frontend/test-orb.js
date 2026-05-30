const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'orb-test-z0.png' });
  await browser.close();
})();
