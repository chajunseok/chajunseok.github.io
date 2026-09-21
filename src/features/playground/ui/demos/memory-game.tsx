import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';
import { createMemoryGame, flipCard, hideUnmatched, isMemoryComplete, isRevealed } from '../../model/memory-game';
import { DemoStage } from '../demo-stage';

const MISMATCH_DELAY_MS = 1000;

export default function MemoryGameDemo() {
  const { t } = useTranslation('playground');
  const [game, setGame] = useState(() => createMemoryGame());
  const complete = isMemoryComplete(game);
  const waiting = game.flipped.length === 2;

  // 틀린 두 장은 잠시 보여 준 뒤 다시 덮는다.
  useEffect(() => {
    if (!waiting) return;
    const timer = setTimeout(() => setGame(hideUnmatched), MISMATCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, [waiting]);

  return (
    <DemoStage className="flex-col p-3">
      <div className="mb-3 flex w-full max-w-[600px] items-center justify-between">
        <p className="text-accent">{t('demos.memory-game.moves', { moves: game.moves })}</p>
        <m.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGame(createMemoryGame())}
          className="bg-primary text-primary-foreground rounded px-3 py-1.5 text-sm"
        >
          {t('demos.memory-game.reset')}
        </m.button>
      </div>

      <div className="grid w-full max-w-[600px] grid-cols-3 gap-3 sm:grid-cols-4">
        {game.cards.map((card, index) => {
          const revealed = isRevealed(game, card.uniqueId);
          return (
            <m.button
              key={card.uniqueId}
              type="button"
              aria-label={
                revealed
                  ? t('demos.memory-game.cardRevealed', { index: index + 1, emoji: card.emoji })
                  : t('demos.memory-game.cardHidden', { index: index + 1 })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGame((prev) => flipCard(prev, card.uniqueId))}
              className={cn(
                'border-accent/10 flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 text-4xl transition-[background] duration-300 sm:text-5xl',
                revealed ? 'from-accent to-background bg-linear-to-br' : 'bg-foreground/5',
              )}
            >
              <AnimatePresence>
                {revealed && (
                  <m.span
                    aria-hidden
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.emoji}
                  </m.span>
                )}
              </AnimatePresence>
            </m.button>
          );
        })}
      </div>

      <AnimatePresence>
        {complete && (
          <m.p
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-accent mt-3 text-center text-xl"
          >
            {t('demos.memory-game.complete', { moves: game.moves })}
          </m.p>
        )}
      </AnimatePresence>
    </DemoStage>
  );
}
