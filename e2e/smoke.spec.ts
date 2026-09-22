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

test('플레이그라운드 데모를 열고 틱택토를 끝까지 둔다', async ({ page }) => {
  await page.goto('/#/playground');

  await page.getByRole('tab', { name: 'Challenge' }).click();
  await page.getByRole('link', { name: /틱택토/ }).click();
  await expect(page).toHaveURL(/#\/playground\/tic-tac-toe$/);

  const cells = page.getByRole('button', { name: /행 .*열/ });
  for (const index of [0, 3, 1, 4, 2]) await cells.nth(index).click();

  await expect(page.getByText('X가 승리했습니다!')).toBeVisible();
});
