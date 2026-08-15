import { globalStyle, style } from '@vanilla-extract/css';
import { font, screen, spacing, theme } from '@/styles';

export const scroll = style({
  overflowX: 'auto',

  '@media': {
    [`(max-width: ${screen.phone})`]: { marginInline: `-${spacing.md}` },
  },
});

export const table = style([font.body, {}]);

/* 셀 스타일은 자손 선택자라 globalStyle 로 건다 (style() 은 '&' 만 허용한다). */
globalStyle(`${table} th, ${table} td`, {
  padding: `8px ${spacing.md}`,
  borderBottom: `1px solid ${theme.outline}`,
  whiteSpace: 'nowrap',
});

/* 헤더는 배경을 깔지 않고 글자만 작게 — 표가 블록처럼 무거워지지 않게. */
globalStyle(`${table} thead th`, {
  ...font.caption,
  paddingBottom: '6px',
  color: theme.textTertiary,
  fontWeight: 500,
});

globalStyle(`${table} tbody th`, {
  fontWeight: 600,
});

globalStyle(
  `${table} tbody tr:last-child th, ${table} tbody tr:last-child td`,
  { borderBottom: 'none' },
);

/** 표 제목은 스크린리더에만 전달하고 화면에서는 섹션 제목이 대신한다. */
export const caption = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

/** 숫자 열 — 오른쪽 정렬 + 고정폭 숫자로 자리수를 맞춘다. */
export const numeric = style({
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
});
