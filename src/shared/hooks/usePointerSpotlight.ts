import { useEffect, useRef } from 'react';

/**
 * 포인터 위치를 요소 기준 CSS 변수(`--pointer-x`, `--pointer-y`)로 쓴다.
 * 리렌더 없이 한 프레임에 한 번만 갱신한다 — 스타일은 CSS(`spotlight` 유틸)가 그린다.
 */
export function usePointerSpotlight<T extends HTMLElement>() {
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

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return ref;
}
