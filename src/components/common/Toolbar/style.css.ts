import { style } from '@vanilla-extract/css';
import {
  elevation,
  flex,
  font,
  layout,
  screen,
  spacing,
  theme,
} from '@/styles';

export const bar = style([
  flex.BETWEEN,
  {
    gap: spacing.md,
    flexWrap: 'wrap',
    padding: `10px 12px`,
    borderRadius: layout.radius.md,
    border: `1px solid ${theme.outline}`,
    backgroundColor: theme.surface,
  },
]);

/** `--app-header-h` 는 RootLayout 이 헤더 높이를 재서 넣어 준다. */
export const stickyBar = style([
  bar,
  {
    '@media': {
      [`(min-width: ${screen.tablet})`]: {
        position: 'sticky',
        top: 'var(--app-header-h, 72px)',
        zIndex: 5,
        boxShadow: elevation[1],
      },
    },
  },
]);

export const controls = style([
  flex.VERTICAL,
  {
    gap: spacing.md,
    flexWrap: 'wrap',
    minWidth: 0,
    maxWidth: '100%',

    '@media': {
      [`(max-width: ${screen.phone})`]: {
        alignItems: 'stretch',
        flexDirection: 'column',
        gap: spacing.sm,
        width: '100%',
      },
    },
  },
]);

export const trailing = style([flex.VERTICAL, { gap: spacing.sm }]);

export const group = style([
  flex.VERTICAL,
  { gap: spacing.sm, minWidth: 0, maxWidth: '100%' },
]);

export const groupLabel = style([
  font.caption,
  {
    color: theme.textTertiary,

    '@media': {
      [`(max-width: ${screen.phone})`]: { display: 'none' },
    },
  },
]);

/**
 * 넓은 화면에서는 한 줄로 밀고, 폰에서는 줄바꿈해 전부 펼친다.
 * 가로로 숨겨 두면 마지막 트랙이 있는 줄도 모르고 지나친다.
 */
export const track = style({
  display: 'flex',
  gap: '2px',
  padding: '3px',
  borderRadius: layout.radius.pill,
  backgroundColor: theme.track,
  minWidth: 0,
  maxWidth: '100%',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',

  selectors: {
    '&::-webkit-scrollbar': { display: 'none' },
  },

  '@media': {
    [`(max-width: ${screen.phone})`]: {
      flexWrap: 'wrap',
      rowGap: '2px',
      borderRadius: layout.radius.md,
    },
  },
});
