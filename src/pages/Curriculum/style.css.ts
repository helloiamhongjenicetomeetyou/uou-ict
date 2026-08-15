import { globalStyle, style } from '@vanilla-extract/css';
import { flex, font, layout, screen, spacing, theme } from '@/styles';

export const page = style([flex.COLUMN_FLEX, { gap: spacing.md }]);

export const firstYear = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.md,
  alignItems: 'start',

  '@media': {
    [`(max-width: ${screen.phone})`]: { gridTemplateColumns: '1fr' },
  },
});

export const geBlock = style([
  flex.COLUMN_FLEX,
  {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: layout.radius.sm,
    backgroundColor: theme.background,
  },
]);

export const geHead = style([
  flex.VERTICAL,
  { gap: spacing.sm, flexWrap: 'wrap' },
]);

const tag = style([
  font.caption,
  { padding: '1px 7px', borderRadius: layout.radius.pill },
]);

export const tagRequired = style([
  tag,
  { backgroundColor: '#FDEBEC', color: theme.error },
]);

export const tagElective = style([
  tag,
  { backgroundColor: theme.track, color: theme.textSecondary },
]);

export const geName = style([font.bodyStrong, { color: theme.textPrimary }]);

export const geCredits = style([
  font.caption,
  { marginLeft: 'auto', color: theme.textTertiary },
]);

export const geRule = style([
  font.caption,
  { color: theme.textSecondary, lineHeight: '165%' },
]);

export const geCourses = style([flex.COLUMN_FLEX, { gap: '2px' }]);

export const geCourse = style([
  flex.VERTICAL,
  {
    gap: spacing.sm,
    padding: `6px ${spacing.sm}`,
    borderRadius: '4px',
    backgroundColor: theme.surface,
  },
]);

export const geCourseName = style([font.body, { color: theme.textPrimary }]);

export const geSub = style([font.caption, { color: theme.textTertiary }]);

export const geCourseCredit = style([
  font.metricSmall,
  { marginLeft: 'auto', color: theme.textSecondary },
]);

export const geNote = style([
  font.caption,
  {
    padding: '1px 6px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.accentSoft,
    color: theme.accent,
  },
]);

export const geFootnote = style([font.caption, { color: theme.textTertiary }]);

export const unpublished = style([
  font.caption,
  {
    padding: `8px ${spacing.sm}`,
    borderRadius: '4px',
    backgroundColor: theme.warnSoft,
    color: theme.warn,
    lineHeight: '165%',
  },
]);

export const diagramLink = style([
  font.caption,
  {
    padding: '5px 12px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.track,
    color: theme.textSecondary,
    ':hover': { color: theme.accent },
  },
]);

export const legend = style([
  flex.VERTICAL,
  { gap: spacing.md, flexWrap: 'wrap' },
]);

export const legendItem = style([
  flex.VERTICAL,
  font.caption,
  { gap: '5px', color: theme.textSecondary },
]);

export const swatch = style({
  width: '3px',
  height: '12px',
  borderRadius: '2px',
});

globalStyle(`${swatch}[data-category='전공필수']`, {
  backgroundColor: theme.error,
});
globalStyle(`${swatch}[data-category='전공공통']`, {
  backgroundColor: '#C8961E',
});
globalStyle(`${swatch}[data-category='전공선택']`, {
  backgroundColor: theme.gray[400],
});

export const baseDot = style({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: theme.accent,
});

export const trackNote = style([
  font.caption,
  {
    padding: `8px ${spacing.md}`,
    borderRadius: layout.radius.sm,
    backgroundColor: theme.accentSoft,
    color: theme.accent,
  },
]);

export const gridScroll = style({
  overflowX: 'auto',

  '@media': {
    [`(max-width: ${screen.phone})`]: { marginInline: `-${spacing.md}` },
  },
});

export const grid = style({
  minWidth: '900px',
  width: 'max-content',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

const rowTemplate = '150px repeat(6, minmax(0, 1fr))';
const rowTemplateNarrow = '104px repeat(6, minmax(0, 1fr))';

export const gridHead = style({
  display: 'grid',
  gridTemplateColumns: rowTemplate,
  gap: '2px',

  '@media': {
    [`(max-width: ${screen.phone})`]: {
      gridTemplateColumns: rowTemplateNarrow,
    },
  },
});

export const moduleHead = style([
  font.caption,
  {
    position: 'sticky',
    left: 0,
    zIndex: 1,
    padding: `6px ${spacing.sm}`,
    backgroundColor: theme.surface,
    color: theme.textTertiary,
  },
]);

export const termHead = style([
  font.caption,
  {
    padding: `6px ${spacing.sm}`,
    borderRadius: '4px',
    backgroundColor: theme.background,
    color: theme.textSecondary,
    textAlign: 'center',
  },
]);

export const gridRow = style({
  display: 'grid',
  gridTemplateColumns: rowTemplate,
  gap: '2px',
  alignItems: 'stretch',

  '@media': {
    [`(max-width: ${screen.phone})`]: {
      gridTemplateColumns: rowTemplateNarrow,
    },
  },
});

/** 가로로 밀어도 어느 모듈 줄을 보고 있는지 놓치지 않게 왼쪽에 붙여 둔다. */
export const moduleCell = style([
  flex.COLUMN_FLEX,
  {
    position: 'sticky',
    left: 0,
    zIndex: 1,
    justifyContent: 'center',
    gap: '2px',
    padding: `8px ${spacing.sm}`,
    borderRadius: '4px',
    backgroundColor: theme.background,
    boxShadow: `1px 0 0 ${theme.outline}`,
  },
]);

export const moduleName = style([
  font.caption,
  { fontWeight: 700, color: theme.textPrimary },
]);

export const moduleCredits = style([
  font.caption,
  { color: theme.textTertiary },
]);

export const moduleMeta = style([
  font.caption,
  { color: theme.textTertiary, fontSize: '0.6875rem' },
]);

export const termCell = style([
  flex.COLUMN_FLEX,
  { gap: '3px', padding: '3px 0' },
]);

export const course = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 8px 6px 10px',
  borderRadius: '4px',
  border: `1px solid ${theme.outline}`,
  backgroundColor: theme.surface,
  // 왼쪽 색 막대 — 원본 이수체계도와 같은 표기
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
  borderLeftColor: theme.gray[400],
});

globalStyle(`${course}[data-category='전공필수']`, {
  borderLeftColor: theme.error,
});
globalStyle(`${course}[data-category='전공공통']`, {
  borderLeftColor: '#C8961E',
});

export const courseName = style([
  font.caption,
  { color: theme.textPrimary, lineHeight: '135%' },
]);

export const courseCredit = style([
  font.caption,
  {
    marginLeft: 'auto',
    color: theme.textTertiary,
    fontVariantNumeric: 'tabular-nums',
  },
]);

export const courseDot = style({
  position: 'absolute',
  top: '4px',
  right: '4px',
  width: '5px',
  height: '5px',
  borderRadius: '50%',
  backgroundColor: theme.accent,
});

export const certList = style([flex.COLUMN_FLEX, { gap: '2px' }]);

export const certRow = style({
  display: 'grid',
  gridTemplateColumns: '150px 1fr',
  gap: spacing.md,
  padding: `6px ${spacing.sm}`,
  borderRadius: '4px',
  ':hover': { backgroundColor: theme.background },

  '@media': {
    [`(max-width: ${screen.phone})`]: {
      gridTemplateColumns: '1fr',
      gap: '2px',
    },
  },
});

export const certModule = style([
  font.caption,
  { fontWeight: 700, color: theme.textPrimary },
]);

export const certItems = style([font.caption, { color: theme.textSecondary }]);

export const electiveArea = style([flex.COLUMN_FLEX, { gap: spacing.sm }]);

export const subAreas = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '6px',

  '@media': {
    [`(max-width: ${screen.tablet})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`(max-width: ${screen.mobile})`]: { gridTemplateColumns: '1fr' },
  },
});

export const subArea = style({
  borderRadius: layout.radius.sm,
  backgroundColor: theme.background,
  overflow: 'hidden',
});

export const subSummary = style([
  flex.BETWEEN,
  font.caption,
  {
    gap: spacing.sm,
    padding: `8px ${spacing.md}`,
    cursor: 'pointer',
    listStyle: 'none',
    ':hover': { backgroundColor: theme.track },
  },
]);

globalStyle(`${subSummary}::-webkit-details-marker`, { display: 'none' });

export const subName = style({ fontWeight: 700, color: theme.textPrimary });

export const subCount = style({ color: theme.textTertiary });

export const subCourses = style([
  flex.FLEX,
  {
    flexWrap: 'wrap',
    gap: '4px',
    padding: `0 ${spacing.md} ${spacing.md}`,
  },
]);

export const subCourse = style([
  font.caption,
  {
    padding: '2px 8px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.surface,
    color: theme.textSecondary,
  },
]);

export const ruleGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing.sm,

  '@media': {
    [`(max-width: ${screen.phone})`]: { gridTemplateColumns: '1fr' },
  },
});

export const ruleCard = style([
  flex.COLUMN_FLEX,
  {
    gap: '3px',
    padding: spacing.md,
    borderRadius: layout.radius.sm,
    backgroundColor: theme.background,
  },
]);

export const ruleName = style([font.bodyStrong, { color: theme.accent }]);

export const ruleDetail = style([
  font.caption,
  { color: theme.textPrimary, lineHeight: '160%' },
]);

export const ruleDegree = style([font.caption, { color: theme.textTertiary }]);

export const ruleNotes = style([flex.COLUMN_FLEX, { gap: '4px' }]);

export const ruleNote = style([
  font.caption,
  {
    position: 'relative',
    paddingLeft: '12px',
    color: theme.textSecondary,
    lineHeight: '165%',

    selectors: {
      '&::before': {
        content: '"※"',
        position: 'absolute',
        left: 0,
        color: theme.textTertiary,
      },
    },
  },
]);

export const stamp = style([font.caption, { color: theme.textTertiary }]);

export const typeTag = style([
  font.caption,
  {
    display: 'inline-block',
    padding: '1px 7px',
    borderRadius: layout.radius.pill,
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

export const code = style([
  font.caption,
  {
    color: theme.textTertiary,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
]);

export const abeek = style([font.caption, { color: theme.textTertiary }]);

export const notice = style([
  font.caption,
  {
    padding: `8px ${spacing.md}`,
    borderRadius: layout.radius.sm,
    backgroundColor: theme.accentSoft,
    color: theme.accent,
    lineHeight: '165%',
  },
]);

export const search = style([
  font.label,
  {
    width: '190px',
    padding: '7px 12px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.track,
    color: theme.textPrimary,
    fontWeight: 500,

    '::placeholder': { color: theme.textTertiary },
    ':focus': { boxShadow: `inset 0 0 0 1px ${theme.accent}` },

    '@media': {
      [`(max-width: ${screen.phone})`]: { width: '100%' },
    },
  },
]);

export const empty = style([
  font.caption,
  {
    padding: `${spacing.md} 0`,
    color: theme.textTertiary,
    textAlign: 'center',
  },
]);

/* 폰 전용 조작 줄 — 칩 대신 셀렉트로 줄 수를 줄인다. */

export const selectRow = style([flex.VERTICAL, { gap: '6px', width: '100%' }]);

const control = style([
  font.label,
  {
    minWidth: 0,
    height: '34px',
    padding: '0 10px',
    borderRadius: layout.radius.pill,
    backgroundColor: theme.track,
    color: theme.textPrimary,
    fontWeight: 600,
    appearance: 'none',
    backgroundImage:
      'linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)',
    backgroundPosition: 'right 14px center, right 9px center',
    backgroundSize: '5px 5px, 5px 5px',
    backgroundRepeat: 'no-repeat',
    paddingRight: '26px',
  },
]);

export const select = style([control, { flex: 1 }]);

export const jump = style([control, { flexShrink: 0, color: theme.accent }]);
