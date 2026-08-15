import { style } from '@vanilla-extract/css';
import { font, layout, spacing, theme } from '@/styles';

const base = style([
  font.body,
  {
    padding: `${spacing.md} ${spacing.md}`,
    borderRadius: layout.radius.sm,
    textAlign: 'center',
  },
]);

export const loading = style([
  base,
  { backgroundColor: theme.background, color: theme.textTertiary },
]);

export const error = style([
  base,
  { backgroundColor: theme.errorSoft, color: theme.error },
]);

export const empty = style([
  base,
  { backgroundColor: theme.background, color: theme.textTertiary },
]);
