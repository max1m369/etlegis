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

  // 1. Numbers (Dark)
  const numbersSec = page.locator('#sec-numbers');
  await numbersSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'v26_rhythm_1_numbers_dark.png') });
  console.log('Captured v26_rhythm_1_numbers_dark.png');

  // 2. Practices (Light)
  const practicesSec = page.locator('#sec-services');
  await practicesSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'v26_rhythm_2_practices_light.png') });
  console.log('Captured v26_rhythm_2_practices_light.png');

  // 3. Team (Dark)
  const aboutSec = page.locator('#sec-about');
  await aboutSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'v26_rhythm_3_team_dark.png') });
  console.log('Captured v26_rhythm_3_team_dark.png');

  // 4. Cases (Light)
  const casesSec = page.locator('#sec-cases');
  await casesSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'v26_rhythm_4_cases_light.png') });
  console.log('Captured v26_rhythm_4_cases_light.png');

  // 5. Blog (Dark)
  const blogSec = page.locator('#sec-blog');
  await blogSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'v26_rhythm_5_blog_dark.png') });
  console.log('Captured v26_rhythm_5_blog_dark.png');

  // 6. Footer (Dark)
  const footerSec = page.locator('footer');
  await footerSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'v26_rhythm_6_footer_dark.png') });
  console.log('Captured v26_rhythm_6_footer_dark.png');

  await browser.close();
  console.log('Done capturing all rhythm screenshots.');
})();
