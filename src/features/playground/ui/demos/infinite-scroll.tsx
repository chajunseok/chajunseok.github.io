import { useEffect, useRef, useState } from 'react';
import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

const PAGE_SIZE = 10;
const LOAD_DELAY_MS = 800; // API 호출 흉내

type Item = { id: number; color: string; height: number };

const generateItems = (page: number): Item[] =>
  Array.from({ length: PAGE_SIZE }, (_, i) => ({
    id: page * PAGE_SIZE + i,
    color: `hsl(${Math.random() * 360}, 70%, 70%)`,
    height: Math.floor(Math.random() * 50) + 100,
  }));

export default function InfiniteScrollDemo() {
  const { t } = useTranslation('playground');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const nextPageRef = useRef(1);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // 스크롤 영역 바닥의 센티널이 보이면 다음 페이지를 붙인다. 처음 렌더 때도 보이므로 첫 페이지가 여기서 로드된다.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || loading) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoading(true);
        timerRef.current = setTimeout(() => {
          const newItems = generateItems(nextPageRef.current++);
          setItems((prev) => [...prev, ...newItems]);
          setLoading(false);
        }, LOAD_DELAY_MS);
      },
      { root: rootRef.current, threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <DemoStage className="p-0">
      <div
        ref={rootRef}
        className="h-[400px] w-full [scrollbar-width:none] overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto w-full max-w-[500px]">
          {items.map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % PAGE_SIZE) * 0.1 }}
              className="border-foreground/10 text-foreground mb-4 flex w-full items-center justify-center rounded-[10px] border text-xl"
              style={{
                height: item.height,
                background: `linear-gradient(135deg, ${item.color} 0%, hsl(var(--background) / 0.8) 100%)`,
              }}
            >
              {t('demos.infinite-scroll.item', { n: item.id })}
            </m.div>
          ))}
          <div ref={sentinelRef} className="h-5">
            {loading && (
              <m.div
                role="status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-primary mt-4 text-center"
              >
                {t('demos.infinite-scroll.loading')}
              </m.div>
            )}
          </div>
        </div>
      </div>
    </DemoStage>
  );
}
