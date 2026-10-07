const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const artifactDir = 'C:/Users/desig/.gemini/antigravity/brain/08001d13-b6ca-4c31-9728-0f3f60d7f94f';
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000); // Wait for 3D model & canvas rendering

  const heroSec = page.locator('#sec-hero');
  await heroSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'v26_hero_monument_clean.png') });
  console.log('Captured v26_hero_monument_clean.png');

  await browser.close();
  console.log('Done capturing hero screenshot.');
})();
