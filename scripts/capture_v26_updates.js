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
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Scroll to About section and screenshot
  const aboutSec = page.locator('#sec-about');
  await aboutSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, 'v26_team_4cards_desktop.png') });
  console.log('Captured v26_team_4cards_desktop.png');

  // 2. Click right arrow to test scroll track
  const nextBtn = page.locator('button[aria-label="Прокрутить вправо"]');
  if (await nextBtn.isVisible()) {
    await nextBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(artifactDir, 'v26_team_scrolled_right.png') });
    console.log('Captured v26_team_scrolled_right.png');
  }

  // 3. Scroll to Footer and screenshot
  const footerSec = page.locator('#sec-footer');
  await footerSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, 'v26_footer_boardroom_table.png') });
  console.log('Captured v26_footer_boardroom_table.png');

  await browser.close();
  console.log('Done.');
})();
