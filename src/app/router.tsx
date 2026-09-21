import { Navigate, Route, Routes } from 'react-router-dom';
import { toPath } from '@/configs/navigation';
import { Pages } from '@/pages';
import { StandardLayout } from './layouts/StandardLayout';

/** pages 레지스트리를 HashRouter 라우트로 연결한다 — 화면 추가는 pages 폴더만 만들면 된다. */
export function AppRouter() {
  return (
    <Routes>
      <Route element={<StandardLayout />}>
        {Object.entries(Pages).map(([screenId, Page]) => (
          <Route key={screenId} path={toPath(screenId)} element={<Page />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
