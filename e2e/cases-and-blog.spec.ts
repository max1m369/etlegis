import { test, expect } from '@playwright/test';

test.describe('Разделы Кейсы и Блог', () => {
  test('Каталог кейсов открывается и содержит оригинальные победы бюро', async ({ page }) => {
    await page.goto('/cases');
    const heading = page.locator('h1');
    await expect(heading).toContainText('БОЛЕЕ 100 УСПЕШНЫХ ДЕЛ');

    // Проверяем наличие знакового кейса на 1,2 млрд руб.
    const billionCase = page.locator('text=1,2 млрд ₽');
    await expect(billionCase).toBeVisible();
  });

  test('Детальная страница кейса открывается корректно', async ({ page }) => {
    const res = await page.goto('/cases/pobeda-v-tyazhbe-1-2-mlrd');
    expect(res?.status()).toBe(200);

    const cta = page.locator('main button:has-text("Обсудить ситуацию"), button:has-text("Обсудить ситуацию"):visible');
    await expect(cta.first()).toBeVisible();
  });

  test('Каталог блога открывается и содержит статьи', async ({ page }) => {
    await page.goto('/blog');
    const articleCards = page.locator('[data-article-card]');
    expect(await articleCards.count()).toBeGreaterThanOrEqual(2);
  });
});
