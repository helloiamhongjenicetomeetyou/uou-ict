import { style } from '@vanilla-extract/css';
import { flex, font, layout, screen, spacing, theme } from '@/styles';

export const page = style([flex.COLUMN_FLEX, { gap: spacing.md }]);

export const count = style([
  font.caption,
  { color: theme.textTertiary, whiteSpace: 'nowrap', flexShrink: 0 },
]);

export const search = style([
  font.body,
  {
    width: '180px',
    padding: '6px 12px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.track,
    color: theme.textPrimary,
    ':focus': { boxShadow: `0 0 0 1px ${theme.accent} inset` },

    '@media': {
      [`(max-width: ${screen.phone})`]: { width: '100%' },
    },
  },
]);

export const sourceLink = style([
  font.caption,
  {
    padding: '5px 12px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.track,
    color: theme.textSecondary,
    ':hover': { color: theme.accent },
  },
]);

export const list = style([flex.COLUMN_FLEX, { gap: '1px' }]);

export const row = style({
  display: 'grid',
  // 이름·직위는 줄바꿈되면 안 되므로 auto 로 두고, 연구분야가 남는 폭을 먹는다.
  gridTemplateColumns: 'minmax(96px, auto) minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: spacing.md,
  padding: `9px ${spacing.sm}`,
  borderRadius: layout.radius.sm,
  ':hover': { backgroundColor: theme.background },

  '@media': {
    [`(max-width: ${screen.tablet})`]: {
      gridTemplateColumns: '1fr',
      gap: '4px',
    },
  },
});

export const identity = style([
  flex.VERTICAL,
  { gap: '6px', whiteSpace: 'nowrap' },
]);

export const name = style([font.bodyStrong, { color: theme.textPrimary }]);

export const rank = style([font.caption, { color: theme.textTertiary }]);

export const note = style([
  font.caption,
  {
    padding: '1px 7px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.accentSoft,
    color: theme.accent,
  },
]);

export const fields = style([flex.FLEX, { flexWrap: 'wrap', gap: '4px' }]);

export const field = style([
  font.caption,
  {
    padding: '2px 8px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.track,
    color: theme.textSecondary,
  },
]);

export const fieldEmpty = style([font.caption, { color: theme.textTertiary }]);

export const contact = style([
  flex.VERTICAL,
  font.caption,
  {
    gap: spacing.sm,
    color: theme.textTertiary,
    justifyContent: 'flex-end',
    whiteSpace: 'nowrap',

    '@media': {
      [`(max-width: ${screen.tablet})`]: {
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        whiteSpace: 'normal',
      },
    },
  },
]);

export const mail = style({
  ':hover': { color: theme.accent, textDecoration: 'underline' },
});

export const empty = style([
  font.body,
  {
    padding: spacing.lg,
    textAlign: 'center',
    color: theme.textTertiary,
  },
]);

export const searchRow = style([
  flex.VERTICAL,
  { gap: spacing.sm, flex: 1, minWidth: 0 },
]);
