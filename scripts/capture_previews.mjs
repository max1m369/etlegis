import { chromium } from '@playwright/test';

async function generatePreviews() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Version 2.0 (Классика)
  console.log('Capturing v2.0...');
  await page.goto('http://localhost:3000/v2');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'public/previews/v2_preview.webp' });

  // 2. Version 2.6 (Сетка 20/40/40)
  console.log('Capturing v2.6...');
  await page.goto('http://localhost:3000/');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'public/previews/v26_preview.webp' });

  // 3. Version 2.7 (Split Editorial)
  console.log('Capturing v2.7...');
  await page.goto('http://localhost:3000/v2-7');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'public/previews/v27_preview.webp' });

  await browser.close();
  console.log('All previews captured successfully!');
}

generatePreviews().catch(console.error);
