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
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2000);

  // Scroll to team section
  const aboutSec = page.locator('#sec-about');
  await aboutSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Click right button to scroll
  const rightBtn = page.locator('button[aria-label="Прокрутить команду вправо"]');
  if (await rightBtn.isVisible()) {
    await rightBtn.click();
    await page.waitForTimeout(800);
  }

  // Capture full viewport at this position to inspect alignment with Col 1 rail
  await page.screenshot({ path: path.join(artifactDir, 'v26_team_viewport_scrolled.png') });
  console.log('Captured v26_team_viewport_scrolled.png');

  await browser.close();
  console.log('Done.');
})();
