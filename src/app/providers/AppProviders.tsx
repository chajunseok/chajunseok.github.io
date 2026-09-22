import type { PropsWithChildren } from 'react';
import { LazyMotion, MotionConfig } from 'motion/react';
import { HashRouter } from 'react-router-dom';
import { initAnalytics } from '@/shared/analytics';

// 첫 페이지뷰보다 먼저 걸려야 하므로 모듈 로드 시점에 초기화한다.
initAnalytics();

// 애니메이션 기능은 첫 화면을 그린 뒤 받는다 — 메인 번들을 줄여 LCP를 앞당긴다.
const loadMotionFeatures = () => import('./motion-features').then((module) => module.default);

export function AppProviders({ children }: PropsWithChildren) {
  return (
    // strict: `motion.*` 대신 `m.*`만 쓰도록 강제한다 (motion.*은 기능 전체를 번들에 넣는다).
    <LazyMotion features={loadMotionFeatures} strict>
      {/* OS의 '동작 줄이기' 설정이면 transform 모션을 끄고 opacity만 남긴다. */}
      <MotionConfig reducedMotion="user">
        <HashRouter>{children}</HashRouter>
      </MotionConfig>
    </LazyMotion>
  );
}
