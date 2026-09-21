import { expect, test } from '@playwright/test';

test('사이드 내비게이션으로 프로젝트 화면에 들어간다', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('주 메뉴').getByRole('link', { name: '프로젝트' }).click();

  await expect(page).toHaveURL(/#\/projects$/);
  await expect(page.getByRole('heading', { name: '프로젝트' })).toBeVisible();
});
