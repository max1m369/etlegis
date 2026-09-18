import { test, expect } from '@playwright/test';

test.describe('Главная страница etlegis.ru — Mobile & Interactive', () => {
  test('На мобильных экранах нет паразитного горизонтального скролла', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
  });

  test('Все CTA-кнопки имеют корректный текст призыва к действию', async ({ page }) => {
    await page.goto('/');
    const ctaButtons = page.locator('button:has-text("Обсудить ситуацию")');
    const count = await ctaButtons.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('Секция практик содержит все 4 группы и не ломается', async ({ page }) => {
    await page.goto('/');
    const practiceCards = page.locator('#practices .grid > div, #practices [data-practice-card]');
    await expect(practiceCards).toHaveCount(4);
  });
});
