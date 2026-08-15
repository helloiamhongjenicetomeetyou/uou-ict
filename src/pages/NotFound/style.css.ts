import { style } from '@vanilla-extract/css';
import { flex, font, layout, spacing, theme } from '@/styles';

export const container = style([
  flex.COLUMN_CENTER,
  { gap: spacing.sm, padding: '96px 0', textAlign: 'center' },
]);

export const code = style([font.appTitle, { color: theme.textTertiary }]);
export const message = style([font.body, { color: theme.textSecondary }]);

export const link = style([
  font.label,
  {
    marginTop: spacing.sm,
    padding: '7px 16px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.accent,
    color: theme.onAccent,
  },
]);
