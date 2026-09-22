import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils/cn';

/** 데모가 올라가는 무대. 가운데 정렬된 최소 높이 400px 패널. */
export function DemoStage({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'border-border bg-card/60 flex min-h-[400px] items-center justify-center rounded-2xl border p-8',
        className,
      )}
      {...props}
    />
  );
}
