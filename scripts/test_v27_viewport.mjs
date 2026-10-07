import { chromium } from '@playwright/test';

async function testScreenshots() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000/v2-7');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/desig/.gemini/antigravity/brain/08001d13-b6ca-4c31-9728-0f3f60d7f94f/v27_practices_viewport_fixed.png' });
  console.log('Practices screenshot saved');

  // Click on 'Команда бюро' in left menu
  await page.click('button:has-text("Команда бюро")');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'C:/Users/desig/.gemini/antigravity/brain/08001d13-b6ca-4c31-9728-0f3f60d7f94f/v27_team_viewport_fixed.png' });
  console.log('Team screenshot saved');

  // Scroll team ribbon horizontally
  await page.evaluate(() => {
    const el = document.querySelector('.horizontal-scroll-container');
    if (el) el.scrollLeft = 700;
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/desig/.gemini/antigravity/brain/08001d13-b6ca-4c31-9728-0f3f60d7f94f/v27_team_scrolled_horiz.png' });
  console.log('Team scrolled horizontally screenshot saved');

  await browser.close();
  console.log('All screenshots verified');
}

testScreenshots().catch(console.error);
