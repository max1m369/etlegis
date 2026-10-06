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

  // 1. Initial Overview
  await page.screenshot({ path: path.join(artifactDir, 'v27_split_overview.png') });
  console.log('Captured v27_split_overview.png');

  // 2. Click "Команда бюро" spoiler
  const teamBtn = page.getByRole('button', { name: /Команда бюро/i });
  await teamBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'v27_split_team_open.png') });
  console.log('Captured v27_split_team_open.png');

  // 3. Click "Успешные кейсы" spoiler
  const casesBtn = page.getByRole('button', { name: /Успешные кейсы/i });
  await casesBtn.click();
  await page.waitForTimeout(500);

  // 4. Click "Все прецеденты бюро" to open cases view on the right
  const allCasesLink = page.getByRole('button', { name: /Все прецеденты бюро/i });
  await allCasesLink.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'v27_split_cases_view.png') });
  console.log('Captured v27_split_cases_view.png');

  // 5. Click "Блог и медиа" to open blog view on the right
  const blogBtn = page.getByRole('button', { name: /Блог и медиа/i });
  await blogBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(artifactDir, 'v27_split_blog_view.png') });
  console.log('Captured v27_split_blog_view.png');

  await browser.close();
  console.log('Done capturing all v2.7 screenshots.');
})();
