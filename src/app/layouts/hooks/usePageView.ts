import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { logPageView } from '@/shared/analytics';

/** 문서 제목을 언어에 맞추고, 라우트가 바뀔 때마다 GA 페이지뷰를 보낸다. */
export function usePageView() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('app.title');
  }, [t]);

  useEffect(() => {
    logPageView(pathname);
  }, [pathname]);
}
