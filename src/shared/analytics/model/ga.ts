import ReactGA from 'react-ga4';
import { APP_CONFIG } from '@/configs/app-config';

let enabled = false;

/** 측정 ID가 없으면(로컬 개발 등) GA를 켜지 않고, 이후 호출은 모두 무시한다. */
export function initAnalytics() {
  if (!APP_CONFIG.gaMeasurementId) return;
  // HashRouter라 GA 자동 페이지뷰는 경로를 못 본다 — 끄고 logPageView로 직접 보낸다.
  ReactGA.initialize(APP_CONFIG.gaMeasurementId, { gtagOptions: { send_page_view: false } });
  enabled = true;
}

export function logPageView(path: string) {
  if (!enabled) return;
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    page_location: `${window.location.origin}/#${path}`,
    title: document.title,
  });
}

export function logEvent(category: string, action: string, label?: string) {
  if (!enabled) return;
  ReactGA.event({ category, action, label });
}
