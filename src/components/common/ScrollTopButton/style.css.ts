import { style, styleVariants } from '@vanilla-extract/css';
import { elevation, flex, layout, spacing, theme } from '@/styles';

const base = style([
  flex.CENTER,
  {
    position: 'fixed',
    right: spacing.lg,
    bottom: spacing.lg,
    zIndex: 20,
    width: '40px',
    height: '40px',
    borderRadius: layout.radius.pill,
    border: `1px solid ${theme.outline}`,
    backgroundColor: theme.surface,
    color: theme.textSecondary,
    fontSize: '15px',
    boxShadow: elevation[1],
    transition: 'opacity 160ms ease, transform 160ms ease, color 120ms',

    ':hover': { color: theme.accent },

    '@media': {
      '(prefers-reduced-motion: reduce)': { transition: 'none' },
    },
  },
]);

/** 보임/숨김을 display 가 아니라 투명도로 바꾼다 — 사라질 때도 미끄러지게. */
export const { hidden, visible } = styleVariants({
  hidden: [
    base,
    { opacity: 0, transform: 'translateY(8px)', pointerEvents: 'none' },
  ],
  visible: [base, { opacity: 1, transform: 'none' }],
});
