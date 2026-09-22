import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';
import { calculateWinner, createBoard, placeMark, type Player } from '../../model/tic-tac-toe';
import { DemoStage } from '../demo-stage';

export default function TicTacToeDemo() {
  const { t } = useTranslation('playground');
  const [board, setBoard] = useState(createBoard);
  const [player, setPlayer] = useState<Player>('X');
  const result = calculateWinner(board);

  const play = (index: number) => {
    if (result) return;
    const next = placeMark(board, index, player);
    if (!next) return;
    setBoard(next);
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const reset = () => {
    setBoard(createBoard());
    setPlayer('X');
  };

  const status = !result
    ? t('demos.tic-tac-toe.next', { player })
    : result.winner === 'draw'
      ? t('demos.tic-tac-toe.draw')
      : t('demos.tic-tac-toe.winner', { player: result.winner });
  const winLine = result && result.winner !== 'draw' ? result.line : [];

  return (
    <DemoStage className="flex-col">
      <p className="text-accent mb-4 text-xl" aria-live="polite">
        {status}
      </p>

      <div className="mb-6 grid w-full max-w-[300px] grid-cols-3 gap-2">
        {board.map((mark, index) => {
          const playable = !mark && !result;
          return (
            <m.button
              key={index}
              type="button"
              aria-label={t('demos.tic-tac-toe.cell', {
                row: Math.floor(index / 3) + 1,
                col: (index % 3) + 1,
                mark: mark ?? t('demos.tic-tac-toe.empty'),
              })}
              aria-disabled={!playable}
              whileHover={playable ? { scale: 1.05 } : undefined}
              whileTap={playable ? { scale: 0.95 } : undefined}
              onClick={() => play(index)}
              className={cn(
                'border-accent/10 flex aspect-square items-center justify-center rounded-lg border-2 text-3xl font-bold',
                winLine.includes(index) ? 'from-accent to-background bg-linear-to-br' : 'bg-foreground/5',
                mark === 'X' ? 'text-accent' : 'text-destructive',
                playable ? 'cursor-pointer' : 'cursor-default',
              )}
            >
              <AnimatePresence mode="wait">
                {mark && (
                  <m.span
                    key={mark}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {mark}
                  </m.span>
                )}
              </AnimatePresence>
            </m.button>
          );
        })}
      </div>

      <m.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={reset}
        className="bg-primary text-primary-foreground rounded-md px-4 py-2"
      >
        {t('demos.tic-tac-toe.reset')}
      </m.button>
    </DemoStage>
  );
}
