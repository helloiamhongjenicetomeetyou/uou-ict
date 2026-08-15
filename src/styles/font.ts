import type { CSSProperties } from '@vanilla-extract/css';

/**
 * 타이포그래피 토큰.
 *
 * 도구처럼 보이게 하려고 스케일을 통째로 줄였다.
 * 화면 제목이 20px, 라벨이 13px 이다. 제목을 32px로 키우면
 * 화면이 소개 페이지처럼 읽히고 정작 표·수치가 뒤로 밀린다.
 */
const REM_BASE = 16;

const fontGenerator = (
  weight: number,
  sizePx: number,
  lineHeight: number,
): CSSProperties => ({
  fontWeight: weight,
  fontSize: `${sizePx / REM_BASE}rem`,
  lineHeight: `${lineHeight}%`,
});

const font = {
  /** 앱 제목 (헤더에 한 번). */
  appTitle: fontGenerator(700, 20, 130),
  /** 섹션 제목. */
  sectionTitle: fontGenerator(700, 15, 140),

  body: fontGenerator(400, 14, 160),
  bodyStrong: fontGenerator(600, 14, 160),

  /** 칩·버튼·탭. 레퍼런스와 같은 13px/600. */
  label: fontGenerator(600, 13, 130),

  /** 지표 숫자 — 표에서 자리수가 흔들리지 않게 고정폭 숫자. */
  metric: {
    ...fontGenerator(700, 22, 120),
    fontVariantNumeric: 'tabular-nums',
  },
  metricSmall: {
    ...fontGenerator(600, 13, 130),
    fontVariantNumeric: 'tabular-nums',
  },

  /** 출처·각주. */
  caption: fontGenerator(500, 12, 145),
} as const;

export default font;
