import { style } from '@vanilla-extract/css';
import { flex, font, layout, screen, spacing, theme } from '@/styles';

export const page = style([flex.COLUMN_FLEX, { gap: spacing.md }]);

export const searchForm = style([flex.VERTICAL, { gap: '6px' }]);

export const searchInput = style([
  font.body,
  {
    width: '200px',
    padding: '6px 12px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.track,
    color: theme.textPrimary,
    ':focus': { boxShadow: `0 0 0 1px ${theme.accent} inset` },
    ':disabled': { color: theme.textTertiary, cursor: 'not-allowed' },

    '@media': {
      [`(max-width: ${screen.phone})`]: { width: '100%' },
    },
  },
]);

export const searchButton = style([
  font.label,
  {
    padding: '6px 14px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.accent,
    color: theme.onAccent,
    whiteSpace: 'nowrap',
    ':disabled': {
      backgroundColor: theme.gray[200],
      color: theme.textTertiary,
      cursor: 'not-allowed',
    },
  },
]);

export const scope = style([font.caption, { color: theme.textTertiary }]);

export const guide = style([
  font.body,
  { color: theme.textSecondary, lineHeight: '175%', maxWidth: '70ch' },
]);

export const guideMuted = style([
  font.caption,
  { color: theme.textTertiary, lineHeight: '165%' },
]);

export const inlineLink = style({
  color: theme.accent,
  ':hover': { textDecoration: 'underline' },
});

export const code = style([
  font.caption,
  {
    padding: '1px 6px',
    marginInline: '2px',
    borderRadius: '4px',
    backgroundColor: theme.track,
    color: theme.textPrimary,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
]);

export const articleList = style([flex.COLUMN_FLEX, { gap: '1px' }]);

export const articleCard = style([
  flex.BETWEEN,
  {
    gap: spacing.md,
    alignItems: 'flex-start',
    padding: `10px ${spacing.sm}`,
    borderRadius: layout.radius.sm,
    ':hover': { backgroundColor: theme.background },

    '@media': {
      [`(max-width: ${screen.phone})`]: {
        flexDirection: 'column',
        gap: '4px',
      },
    },
  },
]);

export const articleMain = style([
  flex.COLUMN_FLEX,
  { gap: '3px', minWidth: 0 },
]);

export const articleTitle = style([
  font.bodyStrong,
  { color: theme.textPrimary },
]);

export const articleLink = style({
  ':hover': { color: theme.accent, textDecoration: 'underline' },
});

export const articleMeta = style([font.caption, { color: theme.textTertiary }]);

export const articleSide = style([
  flex.VERTICAL,
  { gap: spacing.sm, flexShrink: 0 },
]);

export const openAccess = style([
  font.caption,
  {
    padding: '1px 7px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.accentSoft,
    color: theme.accent,
  },
]);

export const citation = style([
  font.caption,
  { color: theme.textTertiary, whiteSpace: 'nowrap' },
]);

/** 추천 검색어 칩 줄. 빈 화면에서 뭘 쳐야 할지 알려준다. */
export const suggestions = style([
  flex.FLEX,
  { flexWrap: 'wrap', gap: '6px', marginTop: spacing.sm },
]);
