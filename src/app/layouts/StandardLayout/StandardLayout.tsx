import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { usePointerSpotlight } from '@/shared/hooks/usePointerSpotlight';
import { usePageView } from '../hooks/usePageView';
import { SideNav } from '../SideNav';

export function StandardLayout() {
  usePageView();
  const { pathname } = useLocation();
  const spotlightRef = usePointerSpotlight<HTMLDivElement>();

  // 라우트가 바뀌면 새 화면을 맨 위부터 보여준다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <div ref={spotlightRef} aria-hidden className="spotlight pointer-events-none fixed inset-0 -z-10" />
      <SideNav />
      <main className="mx-auto max-w-5xl px-4 pt-8 pb-24 md:pt-16 md:pl-56">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
