import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('production pages load their own assets and internal destinations', async ({ page }) => {
  const problems: string[] = [];
  page.on('pageerror', error => problems.push(error.message));
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1:4322')) problems.push(response.url()); });
  for (const path of ['/', '/research/', '/cv/', '/404.html']) {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const anchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!));
    for (const href of anchors) await expect(page.locator(href)).toBeAttached();
  }
  expect(problems).toEqual([]);
});

test('theme persists and copy actions work', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/research/');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Cite', exact: true }).first().click();
  await expect(page.locator('.toast')).toHaveText('SePT citation copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('li2026modelhelpitselfrewardfree');
  await page.goto('/');
  await page.getByRole('button', { name: 'Copy email' }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('mengqili1@link.cuhk.edu.cn');
});

test('StreamBP chunk selection retains the causal prefix and updates the gradient term', async ({ page }) => {
  await page.goto('/research/');
  for (const chunk of [1, 4, 2, 3]) {
    await page.getByRole('button', { name: `Show chunk ${chunk}` }).click();
    await expect(page.locator('.cache-chunk.available')).toHaveCount(chunk);
    await expect(page.locator('.output-chunk.active')).toHaveAttribute('data-chunk', String(chunk - 1));
    await expect(page.locator('.gradient-label')).toContainText(`J${['₁', '₂', '₃', '₄'][chunk - 1]}`);
    await expect(page.getByRole('button', { name: `Show chunk ${chunk}` })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.chunk-status')).toContainText(`Inspecting chunk ${chunk} of 4`);
  }
  await expect(page.getByRole('img', { name: /SePT: sample/ })).toBeAttached();
});

test('paper disclosures expose the overview and citation', async ({ page }) => {
  await page.goto('/research/');
  const paper = page.locator('.paper').first();
  await paper.locator('.paper-summary > summary').click();
  await expect(paper.getByText('Self-evolving Post-Training alternates', { exact: false })).toBeVisible();
  await paper.locator('.citation > summary').click();
  await expect(paper.locator('pre')).toBeVisible();
});

test('clipboard denial opens a readable manual citation fallback', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('denied')) } }));
  await page.goto('/research/');
  await page.getByRole('button', { name: 'Cite', exact: true }).first().click();
  await expect(page.locator('#citation-sept pre')).toBeVisible();
  await expect(page.locator('.toast')).toContainText('Copy unavailable');
});

test('mobile navigation works with keyboard and all narrow layouts fit', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ['/', '/research/', '/cv/']) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('public content and paper overviews remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/research/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'CV' })).toBeVisible();
  await page.locator('.paper-summary > summary').first().click();
  await expect(page.locator('.paper-summary > p').first()).toBeVisible();
  await context.close();
});

test('light, dark, mobile, and CV pages pass automated accessibility checks', async ({ page }) => {
  for (const variant of [
    { path: '/', theme: 'light', width: 1440 },
    { path: '/', theme: 'dark', width: 390 },
    { path: '/cv/', theme: 'light', width: 390 },
    { path: '/research/', theme: 'dark', width: 390 },
  ]) {
    await page.setViewportSize({ width: variant.width, height: 900 });
    await page.goto(variant.path);
    await page.evaluate(theme => document.documentElement.dataset.theme = theme, variant.theme);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
  }
});


test('homepage leads with contributions and keeps technical detail optional', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.intro')).toContainText('machine learning research and software development');
  await expect(page.locator('.featured-entry')).toHaveCount(2);
  await expect(page.locator('.featured-entry').first()).toContainText('First author');
  await expect(page.locator('.personal-copy')).toContainText('like to explore');
  await expect(page.locator('.paper-art')).toHaveCount(0);
  await page.getByRole('link', { name: 'Papers & research details' }).click();
  await expect(page).toHaveURL(/\/research\/$/);
  await expect(page.locator('.paper')).toHaveCount(2);
});
