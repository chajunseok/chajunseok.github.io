import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      default: 'border-border bg-muted/60 text-foreground',
      accent: 'border-primary/40 bg-primary/10 text-primary',
    },
  },
  defaultVariants: { variant: 'default' },
});

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
