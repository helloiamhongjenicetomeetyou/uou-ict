import { globalStyle, style } from '@vanilla-extract/css';
import { flex, font, layout, screen, spacing, theme } from '@/styles';

export const page = style([flex.COLUMN_FLEX, { gap: spacing.md }]);

export const lead = style([
  font.body,
  { color: theme.textSecondary, marginBottom: spacing.sm },
]);

export const statGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: spacing.sm,

  '@media': {
    [`(max-width: ${screen.tablet})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`(max-width: ${screen.mobile})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '6px',
    },
  },
});

export const trackGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing.sm,

  '@media': {
    [`(max-width: ${screen.tablet})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`(max-width: ${screen.phone})`]: { gridTemplateColumns: '1fr' },
  },
});

export const twoUp = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.md,
  alignItems: 'start',

  '@media': {
    [`(max-width: ${screen.phone})`]: { gridTemplateColumns: '1fr' },
  },
});

export const card = style([
  flex.COLUMN_FLEX,
  {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: layout.radius.md,
    border: `1px solid ${theme.outline}`,
    backgroundColor: theme.surface,
  },
]);

export const cardHead = style([flex.VERTICAL, { gap: spacing.sm }]);

export const cardTitle = style([
  font.sectionTitle,
  { marginRight: 'auto', color: theme.textPrimary },
]);

export const cardYear = style([
  font.caption,
  {
    color: theme.textTertiary,
    whiteSpace: 'nowrap',
    ':hover': { color: theme.accent },
  },
]);

export const keywords = style([flex.FLEX, { flexWrap: 'wrap', gap: '4px' }]);

export const keyword = style([
  font.caption,
  {
    padding: '2px 8px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.track,
    color: theme.textSecondary,
  },
]);

export const cardLink = style([
  font.caption,
  {
    marginTop: 'auto',
    color: theme.accent,
    whiteSpace: 'nowrap',
    ':hover': { textDecoration: 'underline' },
  },
]);

export const term = style([flex.COLUMN_FLEX, { gap: spacing.sm }]);

export const termHead = style([
  flex.BETWEEN,
  {
    paddingBottom: '6px',
    borderBottom: `1px solid ${theme.outline}`,
  },
]);

export const termName = style([font.label, { color: theme.textPrimary }]);

export const termCredits = style([
  font.metricSmall,
  { color: theme.textSecondary },
]);

export const courseList = style([flex.COLUMN_FLEX, { gap: '6px' }]);

export const courseRow = style([flex.VERTICAL, { gap: spacing.sm }]);

export const courseName = style([
  font.body,
  { marginRight: 'auto', color: theme.textPrimary },
]);

export const courseCredits = style([
  font.metricSmall,
  { color: theme.textTertiary },
]);

export const typeTag = style([
  font.caption,
  {
    display: 'inline-block',
    minWidth: '38px',
    padding: '1px 7px',
    borderRadius: layout.radius.pill,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    backgroundColor: theme.track,
    color: theme.textSecondary,
  },
]);

globalStyle(`${typeTag}[data-type='전필']`, {
  backgroundColor: '#FDEBEC',
  color: theme.error,
});
globalStyle(`${typeTag}[data-type='교필']`, {
  backgroundColor: theme.warnSoft,
  color: theme.warn,
});

export const pairGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.sm,
});
