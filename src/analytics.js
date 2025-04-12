import ReactGA from 'react-ga4';

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (measurementId) {
    ReactGA.initialize(measurementId, {
      send_page_view: false, // 수동으로 페이지뷰를 전송하기 위해 false로 설정
      debug: process.env.NODE_ENV === 'development' // 개발 환경에서만 디버그 모드 활성화
    });
    // 에러 확인
    console.log('[GA] Initialized with ID:', measurementId);
  } else {
    console.warn('GA4 measurement ID not found');
  }
};

// 페이지 이동 시 page_view 수동 전송 (HashRouter 대응)
export const logPageView = (path) => {
  const pagePath = path || window.location.pathname;
  const fullUrl = window.location.origin + '/#' + pagePath;

  console.log('[GA] Sending pageview:', pagePath);

  ReactGA.send({
    hitType: 'pageview',
    page: pagePath,
    page_location: fullUrl,
    page_title: document.title
  });
};

// 이벤트 트래킹 (클릭 등 사용자 행동 추적)
export const logEvent = (category, action, label, value = null) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
  console.log('[GA] Event:', { category, action, label, value });
};
