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
import { chip, selected } from '@/components/common/Chip/style.css';

export const wrapper = style([flex.COLUMN_FLEX, { minHeight: '100vh' }]);

export const header = style({
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: theme.surface,
  boxShadow: elevation[1],
});

export const headerInner = style([
  flex.BETWEEN,
  {
    gap: spacing.lg,
    width: '100%',
    maxWidth: layout.contentWidth,
    margin: '0 auto',
    padding: `14px ${layout.sideMargin}`,

    '@media': {
      [`(max-width: ${screen.tablet})`]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing.sm,
        padding: `14px ${layout.sideMarginMobile}`,
      },
    },
  },
]);

export const brand = style([
  flex.FLEX,
  { gap: '10px', alignItems: 'center', flexShrink: 0 },
]);

export const mark = style({
  width: '6px',
  alignSelf: 'stretch',
  minHeight: '34px',
  borderRadius: '3px',
  background: `linear-gradient(180deg, ${theme.series.ict}, ${theme.series.it})`,
});

export const title = style([font.appTitle, { color: theme.textPrimary }]);

export const subtitle = style([
  font.caption,
  { marginTop: '2px', color: theme.textSecondary },
]);

export const nav = style({
  display: 'flex',
  gap: '2px',
  padding: '3px',
  borderRadius: layout.radius.pill,
  backgroundColor: theme.track,

  '@media': {
    [`(max-width: ${screen.tablet})`]: {
      width: '100%',
      overflowX: 'auto',
    },
  },
});

/* 내비게이션도 같은 칩 모양을 쓴다 — 선택 표시가 화면마다 달라지지 않게. */
export const navLink = chip;
export const navActive = selected;

export const main = style({
  flex: 1,
  width: '100%',
  maxWidth: layout.contentWidth,
  margin: '0 auto',
  padding: `${spacing.lg} ${layout.sideMargin} ${spacing.xxl}`,

  '@media': {
    [`(max-width: ${screen.phone})`]: {
      padding: `${spacing.md} ${layout.sideMarginMobile} ${spacing.xl}`,
    },
  },
});

export const footer = style([
  font.caption,
  {
    padding: `${spacing.lg} ${layout.sideMargin}`,
    borderTop: `1px solid ${theme.outline}`,
    color: theme.textTertiary,
    textAlign: 'center',
  },
]);
