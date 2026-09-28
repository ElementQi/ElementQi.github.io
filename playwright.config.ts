import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4322',
    launchOptions: existsSync(chrome) ? { executablePath: chrome } : {},
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4322',
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: !process.env.CI,
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
  },
});
