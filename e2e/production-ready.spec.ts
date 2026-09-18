import { test, expect } from '@playwright/test';

test.describe('Финальная верификация продакшена', () => {
  test('Sitemap и Robots.txt доступны и валидны', async ({ page }) => {
    const robotsRes = await page.goto('/robots.txt');
    expect(robotsRes?.status()).toBe(200);

    const sitemapRes = await page.goto('/sitemap.xml');
    expect(sitemapRes?.status()).toBe(200);
  });

  test('Сквозной клик CTA-кнопки открывает модальное окно', async ({ page }) => {
    await page.goto('/');
    const mainCta = page.locator('button:has-text("Обсудить ситуацию"):visible').first();
    await mainCta.click();

    const modal = page.locator('h3:has-text("Обсудить ситуацию"):visible').first();
    await expect(modal).toBeVisible();
  });
});
