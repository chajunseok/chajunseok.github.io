/** 사이드 내비게이션 순서. 값은 pages 폴더명(screenId)이다. */
export const NAV_SCREEN_IDS = ['home', 'projects', 'playground', 'contact'] as const;

/** 기본 경로는 `/{screenId}`. 다른 경로를 쓰는 화면만 적는다. */
const PATH_OVERRIDES: Record<string, string> = {
  home: '/',
  'project-detail': '/projects/:projectId',
};

/** screenId → HashRouter 라우트 경로. */
export function toPath(screenId: string) {
  return PATH_OVERRIDES[screenId] ?? `/${screenId}`;
}

export function projectPath(projectId: string) {
  return `/projects/${projectId}`;
}
