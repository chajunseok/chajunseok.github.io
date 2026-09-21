import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

// 카드마다 accent(청록) → primary(보라)로 색조가 옮겨간다.
const INITIAL_CARDS = [
  { id: 1, hue: 170 },
  { id: 2, hue: 190 },
  { id: 3, hue: 210 },
  { id: 4, hue: 230 },
  { id: 5, hue: 250 },
];

export default function ExitDemo() {
  const { t } = useTranslation('playground');
  const [cards, setCards] = useState(INITIAL_CARDS);

  const removeCard = () => setCards((prev) => prev.slice(0, -1));

  return (
    <DemoStage className="min-h-[500px]">
      <div className="relative h-[250px] w-[300px]">
        <AnimatePresence>
          {cards.map((card, index) => (
            <m.button
              type="button"
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, rotate: (index - 2) * 3 }}
              exit={{ opacity: 0, x: 100, rotate: 20, transition: { duration: 0.5 } }}
              onClick={removeCard}
              className="text-foreground absolute flex h-[200px] w-full cursor-pointer items-center justify-center rounded-[15px] text-xl shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
              style={{
                top: index * 20,
                background: `linear-gradient(135deg, hsl(${card.hue} 90% 65%) 0%, hsl(var(--background)) 100%)`,
              }}
            >
              {t('demos.exit.card', { id: card.id })}
            </m.button>
          ))}
        </AnimatePresence>

        {cards.length === 0 && (
          <m.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setCards(INITIAL_CARDS)}
            className="border-primary text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-[5px] border bg-transparent px-4 py-2 text-sm whitespace-nowrap"
          >
            {t('demos.exit.reset')}
          </m.button>
        )}
      </div>
    </DemoStage>
  );
}
