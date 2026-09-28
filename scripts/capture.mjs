import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';

// Run against a local dev or preview server: node scripts/capture.mjs [URL]
const base = process.argv[2] || 'http://127.0.0.1:4321';
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
mkdirSync('tmp', { recursive: true });
const browser = await chromium.launch(existsSync(chrome) ? { executablePath: chrome } : {});
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'tmp/desktop.png', fullPage: true });
  await page.screenshot({ path: 'tmp/first-screen.png' });
  await page.evaluate(() => document.documentElement.dataset.theme = 'dark');
  await page.screenshot({ path: 'tmp/dark.png', fullPage: true });
  await page.evaluate(() => document.documentElement.dataset.theme = 'light');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'tmp/mobile.png', fullPage: true });
  await page.goto(new URL('/cv/', base).href);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: 'tmp/cv-review.pdf', printBackground: true, preferCSSPageSize: true });

  // Social preview uses the same personal introduction as the homepage.
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    const intro = document.querySelector('.intro').innerHTML;
    document.body.innerHTML = `<div style="height:630px;padding:60px 72px;background:var(--bg)"><div class="intro" style="width:100%;padding:35px 0;gap:60px">${intro}</div><p style="font-size:13px;color:var(--muted);padding-top:32px;border-top:1px solid var(--line)">elementqi.github.io</p></div>`;
  });
  await page.screenshot({ path: 'public/social.png' });
  console.log('Captured desktop, mobile, dark theme, print CV, and public/social.png');
} finally {
  await browser.close();
}
