import type { PropsWithChildren } from 'react';
import { HashRouter } from 'react-router-dom';
import { initAnalytics } from '@/shared/analytics';

// 첫 페이지뷰보다 먼저 걸려야 하므로 모듈 로드 시점에 초기화한다.
initAnalytics();

export function AppProviders({ children }: PropsWithChildren) {
  return <HashRouter>{children}</HashRouter>;
}
