import { keyframes, style } from '@vanilla-extract/css';
import { flex, font, layout, screen, spacing, theme } from '@/styles';

/** 들어올 때만 아주 살짝. 6px 이상 움직이면 도구가 아니라 광고처럼 읽힌다. */
const enter = keyframes({
  from: { opacity: 0, transform: 'translateY(6px)' },
  to: { opacity: 1, transform: 'none' },
});

export const section = style([
  flex.COLUMN_FLEX,
  {
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: layout.radius.md,
    border: `1px solid ${theme.outline}`,
    backgroundColor: theme.surface,

    /** 바로가기로 뛰었을 때 스티키 헤더에 제목이 물리지 않게. */
    scrollMarginTop: '88px',

    animation: `${enter} 320ms ease-out both`,

    /* 위에서부터 차례로 들어오게 — 한꺼번에 뜨면 어디를 봐야 할지 모른다. */
    selectors: {
      '&:nth-of-type(2)': { animationDelay: '60ms' },
      '&:nth-of-type(3)': { animationDelay: '120ms' },
      '&:nth-of-type(n+4)': { animationDelay: '180ms' },
    },

    '@media': {
      '(prefers-reduced-motion: reduce)': { animation: 'none' },
    },
  },
]);

export const header = style([
  flex.BETWEEN,
  {
    gap: spacing.md,
    minHeight: '26px',

    '@media': {
      [`(max-width: ${screen.phone})`]: {
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: spacing.sm,
      },
    },
  },
]);

export const heading = style([
  flex.VERTICAL,
  { gap: spacing.sm, flexWrap: 'wrap' },
]);

export const title = style([font.sectionTitle, { color: theme.textPrimary }]);

/** 제목 옆 한 줄 메모. 문단이 아니라 조건 표시용. */
export const note = style([font.caption, { color: theme.textTertiary }]);

export const action = style([
  flex.VERTICAL,
  { gap: spacing.sm, flexShrink: 0 },
]);

export const source = style([
  flex.VERTICAL,
  font.caption,
  {
    gap: '6px',
    flexWrap: 'wrap',
    marginTop: '2px',
    paddingTop: spacing.sm,
    borderTop: `1px solid ${theme.outline}`,
    color: theme.textTertiary,
  },
]);

export const link = style({
  color: theme.textSecondary,
  ':hover': { color: theme.accent, textDecoration: 'underline' },
});
