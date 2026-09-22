import { ReactGAImplementation } from 'react-ga4';
import { APP_CONFIG } from '@/configs/app-config';

// default export는 CJS `exports.default`라 rolldown 번들에서 `.default.default`로 풀려 런타임에 죽는다 — named export를 쓴다.
const ReactGA = new ReactGAImplementation();
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
