import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { usePointerSpotlight } from '@/shared/hooks/usePointerSpotlight';
import { ErrorBoundary } from '@/shared/widget/error-boundary';
import { usePageView } from '../hooks/usePageView';
import { SideNav } from '../SideNav';

export function StandardLayout() {
  usePageView();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const spotlightRef = usePointerSpotlight<HTMLDivElement>({ target: 'window' });

  // 라우트가 바뀌면 새 화면을 맨 위부터 보여준다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <div ref={spotlightRef} aria-hidden className="spotlight pointer-events-none fixed inset-0 -z-10" />
      <SideNav />
      <main className="mx-auto max-w-5xl px-4 pt-8 pb-24 md:pt-16 md:pl-56">
        {/* 재배포로 해시가 바뀐 lazy 청크 로드 실패 등이 앱 전체를 비우지 않게. 경로가 바뀌면 다시 시도한다. */}
        <ErrorBoundary key={pathname} fallback={<p role="alert">{t('page.loadFailed')}</p>}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
