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

  // 1. Practices section
  const practicesSec = page.locator('#sec-services');
  await practicesSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'v26_practices_refactored.png') });
  console.log('Captured v26_practices_refactored.png');

  // 2. Team section - test drag scroll
  const aboutSec = page.locator('#sec-about');
  await aboutSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  
  // Test drag on track
  const track = page.locator('#sec-about div.overflow-x-scroll');
  const box = await track.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5, { steps: 15 });
    await page.mouse.up();
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: path.join(artifactDir, 'v26_team_dragged.png') });
  console.log('Captured v26_team_dragged.png');

  // 3. Cases section
  const casesSec = page.locator('#sec-cases');
  await casesSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'v26_cases_square_cards.png') });
  console.log('Captured v26_cases_square_cards.png');

  // 4. Blog section
  const blogSec = page.locator('#sec-blog');
  await blogSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'v26_blog_square_cards.png') });
  console.log('Captured v26_blog_square_cards.png');

  await browser.close();
  console.log('Done.');
})();
