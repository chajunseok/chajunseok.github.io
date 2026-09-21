import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

const modules = import.meta.glob<{ default: ComponentType }>('./*/index.tsx');

/** 폴더명이 곧 screenId다 (kebab-case). 라우트 경로는 configs/navigation의 toPath가 정한다. */
export const Pages: Record<string, LazyExoticComponent<ComponentType>> = {};

for (const [path, importer] of Object.entries(modules)) {
  const screenId = path.split('/').at(-2)!;
  Pages[screenId] = lazy(importer);
}
