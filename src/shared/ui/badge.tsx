import type { ComponentProps } from 'react';
import { cn } from '@/shared/utils/cn';
import { badgeVariants, type BadgeVariantProps } from './badge-variants';

export function Badge({ className, variant, ...props }: ComponentProps<'span'> & BadgeVariantProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
