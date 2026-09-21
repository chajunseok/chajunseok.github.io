/** 사이드 내비게이션 순서. 값은 pages 폴더명(screenId)이다. */
export const NAV_SCREEN_IDS = ['home', 'projects', 'playground', 'contact'] as const;

export const HOME_SCREEN_ID = 'home';

/** screenId → HashRouter 경로. 홈만 루트다. */
export function toPath(screenId: string) {
  return screenId === HOME_SCREEN_ID ? '/' : `/${screenId}`;
}
