/**
 * 레이아웃 토큰.
 * 표·차트가 넓게 눕는 도구형 화면이라 본문 폭을 넉넉히 잡는다.
 */
const layout = {
  contentWidth: '1160px',
  sideMargin: '28px', // 레퍼런스 헤더 좌우 패딩과 같은 값
  sideMarginMobile: '16px',
  radius: {
    sm: '6px',
    md: '10px',
    /** 칩·세그먼트는 완전한 알약 모양. */
    pill: '999px',
  },
} as const;

export default layout;
