/**
 * 절제된 중립 팔레트.
 * 색은 데이터(막대·상태)에만 쓰고, 껍데기는 회색 계열로 물러나게 한다.
 * 카드마다 파란 배경·큰 숫자를 깔면 정작 봐야 할 수치가 묻힌다.
 */

const gray = {
  900: '#111111', // 제목
  700: '#374151',
  500: '#6B7280', // 보조 텍스트
  400: '#9CA3AF', // 비활성·각주
  300: '#D1D5DB',
  200: '#E5E7EB', // 테두리
  100: '#F3F4F6', // 칩 트랙
  50: '#F8F9FB', // 페이지 배경
  0: '#FFFFFF',
} as const;

/** 헤더 브랜드 마크의 그라데이션 두 끝. 학부 로고 색에서 가져왔다. */
const series = {
  ict: '#00A663',
  it: '#007A4D',
} as const;

const theme = {
  gray,
  series,

  /* Surface */
  background: gray[50],
  surface: gray[0],
  track: gray[100],

  /** Accent — 학부 로고 색. 강조는 이 한 색으로만 한다. */
  accent: '#00A663',
  accentSoft: '#E6F6EF',
  onAccent: '#FFFFFF',

  /* 상태 — 의미가 있을 때만 쓴다. 계열 색으로 재사용하지 않는다. */
  warn: '#B45309',
  warnSoft: '#FFFBEB',
  ok: '#15803D',
  okSoft: '#F0FDF4',
  error: '#B91C1C',
  errorSoft: '#FEF2F2',

  /* Outline */
  outline: gray[200],

  /* Text 위계 */
  textPrimary: gray[900],
  textSecondary: gray[500],
  textTertiary: gray[400],
} as const;

export default theme;
