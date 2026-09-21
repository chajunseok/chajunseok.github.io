import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { usePageView } from '../hooks/usePageView';
import { SideNav } from '../SideNav';

export function StandardLayout() {
  usePageView();

  return (
    <div className="min-h-screen">
      <SideNav />
      <main className="mx-auto max-w-5xl px-4 py-16 md:pl-56">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
