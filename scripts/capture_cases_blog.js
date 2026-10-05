const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const artifactDir = 'C:/Users/desig/.gemini/antigravity/brain/08001d13-b6ca-4c31-9728-0f3f60d7f94f';

  // 1. Desktop Light (1440px)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/#cases', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const casesSection = page.locator('#cases');
  await casesSection.screenshot({ path: path.join(artifactDir, 'cases_section_updated.png') });

  const blogSection = page.locator('#blog');
  await blogSection.screenshot({ path: path.join(artifactDir, 'blog_section_updated.png') });

  // 2. Desktop Dark (1440px)
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(400);

  await casesSection.screenshot({ path: path.join(artifactDir, 'cases_section_dark.png') });
  await blogSection.screenshot({ path: path.join(artifactDir, 'blog_section_dark.png') });

  // 3. Mobile (390px)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000/#cases', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);

  const mobileCases = mobilePage.locator('#cases');
  await mobileCases.screenshot({ path: path.join(artifactDir, 'cases_mobile_updated.png') });

  const mobileBlog = mobilePage.locator('#blog');
  await mobileBlog.screenshot({ path: path.join(artifactDir, 'blog_mobile_updated.png') });

  await browser.close();
  console.log('All screenshots captured!');
})();
