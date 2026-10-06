const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const artifactDir = 'C:/Users/desig/.gemini/antigravity/brain/08001d13-b6ca-4c31-9728-0f3f60d7f94f';
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  
  console.log('Navigating to http://localhost:3000/v2-7 ...');
  await page.goto('http://localhost:3000/v2-7', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // 1. Initial page with all practices (horizontal view)
  await page.screenshot({ path: path.join(artifactDir, 'v27_direct_practices_view.png') });
  console.log('Captured v27_direct_practices_view.png');

  // Scroll horizontal container slightly
  const container = await page.$('.horizontal-scroll-container');
  if (container) {
    await page.evaluate(el => { el.scrollLeft = 380; }, container);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(artifactDir, 'v27_practices_horiz_scrolled.png') });
    console.log('Captured v27_practices_horiz_scrolled.png');
  }

  // 2. Click on "Команда бюро" in the left menu to trigger 3D Cube transition to team
  const teamBtn = page.getByRole('button', { name: /Команда бюро/i }).first();
  await teamBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'v27_direct_team_view.png') });
  console.log('Captured v27_direct_team_view.png');

  // 3. Click on "Успешные кейсы" in the left menu
  const casesBtn = page.getByRole('button', { name: /Успешные кейсы/i }).first();
  await casesBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'v27_direct_cases_view.png') });
  console.log('Captured v27_direct_cases_view.png');

  // 4. Click on "Блог и медиа"
  const blogBtn = page.getByRole('button', { name: /Блог и медиа/i }).first();
  await blogBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'v27_direct_blog_view.png') });
  console.log('Captured v27_direct_blog_view.png');

  await browser.close();
  console.log('Done capturing all verification screenshots!');
})();
