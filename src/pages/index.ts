import { lazy, type ComponentType } from 'react';

type PageModule = { default: ComponentType };

// 홈은 첫 화면(LCP)이라 메인 번들에 넣는다 — lazy면 메인 JS·CSS 뒤에야 청크를 요청해 렌더가 늦어진다.
const eagerModules = import.meta.glob<PageModule>('./home/index.tsx', { eager: true });
const lazyModules = import.meta.glob<PageModule>('./*/index.tsx');

/** 폴더명이 곧 screenId다 (kebab-case). 라우트 경로는 configs/navigation의 toPath가 정한다. */
export const Pages: Record<string, ComponentType> = {};

const screenId = (path: string) => path.split('/').at(-2)!;

for (const [path, importer] of Object.entries(lazyModules)) {
  Pages[screenId(path)] = lazy(importer);
}
for (const [path, module] of Object.entries(eagerModules)) {
  Pages[screenId(path)] = module.default;
}
