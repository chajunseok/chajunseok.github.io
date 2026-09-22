import { useEffect, useRef } from 'react';

type Options = {
  /** 'element'(기본)는 요소 위에서만, 'window'는 화면 전체에서 포인터를 따라간다. */
  target?: 'element' | 'window';
};

/**
 * 포인터 위치를 요소 기준 CSS 변수(`--pointer-x`, `--pointer-y`)로 쓴다.
 * 리렌더 없이 한 프레임에 한 번만 갱신한다 — 스타일은 CSS(`spotlight` 유틸)가 그린다.
 */
export function usePointerSpotlight<T extends HTMLElement>({ target = 'element' }: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        element.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
      });
    };

    // 카드는 자기 위에서만 듣는다 — 카드마다 window 리스너를 달면 포인터 이동마다 전부 레이아웃을 읽는다.
    const source: Window | HTMLElement = target === 'window' ? window : element;
    source.addEventListener('pointermove', onMove as EventListener, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      source.removeEventListener('pointermove', onMove as EventListener);
    };
  }, [target]);

  return ref;
}
