import type { ComponentType, LazyExoticComponent } from 'react';
import type { LucideIcon } from 'lucide-react';
import type koPlayground from '@/shared/i18n/locales/ko.playground.json';

export type DemoCategory = 'effects' | 'tech' | 'challenge';

/** i18n `playground:demos.{id}` 키와 같다 — 번역이 없는 id는 컴파일 단계에서 막힌다. */
export type DemoId = keyof (typeof koPlayground)['demos'];

export interface Demo {
  id: DemoId;
  category: DemoCategory;
  tech: string[];
  /** 목록 카드의 미리보기 타일에 그리는 아이콘 */
  icon: LucideIcon;
  Component: LazyExoticComponent<ComponentType>;
}
