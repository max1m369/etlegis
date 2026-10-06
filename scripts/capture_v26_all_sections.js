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
  // Use domcontentloaded to avoid waiting for heavy payload DB query in dev mode
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2000);

  // 1. Hero with Quiz screenshot
  const heroSec = page.locator('#sec-hero');
  await heroSec.screenshot({ path: path.join(artifactDir, 'v26_hero_with_quiz.png') });
  console.log('Captured v26_hero_with_quiz.png');

  // 2. Factoids & Numbers screenshot
  const numbersSec = page.locator('#sec-numbers');
  await numbersSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await numbersSec.screenshot({ path: path.join(artifactDir, 'v26_numbers_section.png') });
  console.log('Captured v26_numbers_section.png');

  // 3. Cases screenshot
  const casesSec = page.locator('#sec-cases');
  await casesSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await casesSec.screenshot({ path: path.join(artifactDir, 'v26_cases_section.png') });
  console.log('Captured v26_cases_section.png');

  // 4. Blog screenshot
  const blogSec = page.locator('#sec-blog');
  await blogSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await blogSec.screenshot({ path: path.join(artifactDir, 'v26_blog_section.png') });
  console.log('Captured v26_blog_section.png');

  // 5. Test team section scroll by dragging or clicking button
  const aboutSec = page.locator('#sec-about');
  await aboutSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  // Click right button to scroll
  const rightBtn = page.locator('button[aria-label="Прокрутить команду вправо"]');
  if (await rightBtn.isVisible()) {
    await rightBtn.click();
    await page.waitForTimeout(800);
    await aboutSec.screenshot({ path: path.join(artifactDir, 'v26_team_scrolled_working.png') });
    console.log('Captured v26_team_scrolled_working.png');
  }

  await browser.close();
  console.log('Done.');
})();
