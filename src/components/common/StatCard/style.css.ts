import { style } from '@vanilla-extract/css';
import { flex, font, layout, spacing, theme } from '@/styles';

export const card = style([
  flex.COLUMN_FLEX,
  {
    gap: '3px',
    padding: `10px ${spacing.md}`,
    borderRadius: layout.radius.sm,
    backgroundColor: theme.background,
  },
]);

export const label = style([font.caption, { color: theme.textSecondary }]);

export const value = style([font.metric, { color: theme.textPrimary }]);

export const hint = style([font.caption, { color: theme.textTertiary }]);
