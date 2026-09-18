import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3005",
    channel: "chrome",
  },
  projects: [
    {
      name: "Mobile iPhone SE (375px)",
      use: {
        viewport: { width: 375, height: 667 },
        isMobile: true,
        hasTouch: true,
        channel: "chrome",
      },
    },
    {
      name: "Mobile iPhone 14 (390px)",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        channel: "chrome",
      },
    },
    {
      name: "Desktop Chrome",
      use: {
        viewport: { width: 1440, height: 900 },
        isMobile: false,
        hasTouch: false,
        channel: "chrome",
      },
    },
  ],
  webServer: {
    command: "npx next start -p 3005",
    url: "http://localhost:3005",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
