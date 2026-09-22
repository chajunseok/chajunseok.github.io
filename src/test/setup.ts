import '@testing-library/jest-dom/vitest';
import '@/shared/i18n';

// jsdom에 없는 브라우저 API — 모션(whileInView)과 라우트 전환 스크롤이 마운트만 해도 호출한다.
if (!('IntersectionObserver' in globalThis)) {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
}
window.scrollTo = () => {};
