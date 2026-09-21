import type { ComponentProps } from 'react';
import { usePointerSpotlight } from '@/shared/hooks/usePointerSpotlight';
import { cn } from '@/shared/utils/cn';

/** hover 시 포인터를 따라가는 빛이 켜지는 카드. */
export function SpotlightCard({ className, children, ...props }: ComponentProps<'div'>) {
  const ref = usePointerSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'group border-border bg-card hover:border-primary/40 relative overflow-hidden rounded-2xl border transition-[transform,border-color] duration-300 hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
