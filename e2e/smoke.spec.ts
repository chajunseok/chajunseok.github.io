import { expect, test } from '@playwright/test';

test('사이드 내비게이션으로 프로젝트 화면에 들어간다', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('주 메뉴').getByRole('link', { name: '프로젝트' }).click();

  await expect(page).toHaveURL(/#\/projects$/);
  await expect(page.getByRole('heading', { level: 1, name: '프로젝트' })).toBeVisible();
});

test('프로젝트 카드를 누르면 공유 가능한 상세 페이지로 이동한다', async ({ page }) => {
  await page.goto('/#/projects');

  await page.getByRole('link', { name: /POTLESS/ }).click();

  await expect(page).toHaveURL(/#\/projects\/potless$/);
  await expect(page.getByRole('heading', { level: 1, name: 'POTLESS' })).toBeVisible();
});
