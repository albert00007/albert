const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);
  
  // Take screenshot before
  await page.screenshot({ path: '/tmp/before-z-fix.png' });
  
  // Apply fix
  await page.evaluate(() => {
    const parent = document.querySelector('div.fixed.-z-10');
    if (parent) {
      parent.style.zIndex = '0';
      parent.style.backgroundColor = 'transparent';
    }
  });
  
  // Wait a bit
  await page.waitForTimeout(500);
  
  // Take screenshot after
  await page.screenshot({ path: '/tmp/after-z-fix.png' });
  
  await browser.close();
  console.log('Screenshots saved to /tmp');
})();
