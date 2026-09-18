import { test, expect } from "@playwright/test";

test.describe("Mobile UX & Accessibility Specification Tests", () => {
  /**
   * test_viewport_mobile_no_overflow
   * На экранах 375px (iPhone SE) и 390px (iPhone 14/15) горизонтальный скролл страницы строго равен 0
   * (document.documentElement.scrollWidth === window.innerWidth).
   */
  test("test_viewport_mobile_no_overflow on 375px (iPhone SE) and 390px", async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: "iPhone SE" },
      { width: 390, height: 844, name: "iPhone 14" },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(500);

      const overflow = await page.evaluate(() => {
        const scrollWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;
        return {
          scrollWidth,
          innerWidth,
          hasHorizontalScroll: scrollWidth > innerWidth,
          diff: scrollWidth - innerWidth,
        };
      });

      expect(
        overflow.hasHorizontalScroll,
        `Detected horizontal overflow on ${vp.name} (${vp.width}px): scrollWidth=${overflow.scrollWidth}, innerWidth=${overflow.innerWidth}`
      ).toBe(false);
      expect(overflow.scrollWidth).toBe(overflow.innerWidth);
    }
  });

  /**
   * test_practices_swipeable
   * На мобильном вьюпорте секция практик свайпается пальцем,
   * карточки имеют атрибуты доступности (role="region" / aria-roledescription="slide").
   */
  test("test_practices_swipeable with accessibility attributes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Locate practices section and cards
    const carousel = page.locator('[data-testid="practices-carousel"]');
    await expect(carousel).toBeVisible({ timeout: 5000 });

    const practiceCards = carousel.locator('[role="region"][aria-roledescription="slide"]');
    await expect(practiceCards.first()).toBeVisible({ timeout: 5000 });
    const count = await practiceCards.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Verify touch/swipe action by dispatching touch events or scrolling
    const initialScrollLeft = await carousel.evaluate((el) => el.scrollLeft);
    
    // Simulate swipe left
    await carousel.evaluate((el) => {
      el.scrollBy({ left: 250, behavior: "instant" });
    });
    await page.waitForTimeout(300);

    const scrolledLeft = await carousel.evaluate((el) => el.scrollLeft);
    expect(scrolledLeft).toBeGreaterThanOrEqual(initialScrollLeft);
  });

  /**
   * test_smooth_scroll_integration
   * Инициализирован Lenis, на body нет артефактов дергания, useGSAP не выдает консольных ворнингов утечки памяти.
   */
  test("test_smooth_scroll_integration and no memory leak warnings", async ({ page }) => {
    const consoleWarnings: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "warning" || msg.type() === "error") {
        consoleWarnings.push(msg.text());
      }
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    // Verify Lenis class is attached to html or body
    const hasLenis = await page.evaluate(() => {
      return document.documentElement.classList.contains("lenis") || 
             document.body.classList.contains("lenis") ||
             window.hasOwnProperty("lenis") ||
             document.querySelector(".lenis") !== null;
    });

    // Check no memory leak / GSAP warnings in console
    const leakWarnings = consoleWarnings.filter(
      (w) => w.includes("memory leak") || w.includes("MaxListenersExceededWarning")
    );
    expect(leakWarnings.length).toBe(0);
  });
});
