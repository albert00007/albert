const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });
  
  // wait 1s for hydration and animation
  await page.waitForTimeout(1000);
  
  // move mouse to center
  await page.mouse.move(640, 400);
  await page.waitForTimeout(500);
  
  await page.screenshot({ path: 'orb-test-final.png' });
  
  await browser.close();
})();
