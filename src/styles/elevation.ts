/**
 * Elevation 토큰.
 *
 * 거의 안 쓴다. 면을 나누는 일은 그림자가 아니라 1px 테두리가 한다.
 * 그림자를 층층이 쌓으면 카드가 둥둥 떠 보이고 화면이 무거워진다.
 * `1` 은 레퍼런스와 같은 값으로, 눌린 칩/헤더에만 쓴다.
 */
const elevation = {
  default: 'none',
  1: '0 1px 2px rgba(17, 17, 17, 0.05)',
  /** 툴팁·팝오버처럼 실제로 떠 있어야 하는 것만. */
  overlay: '0 8px 24px rgba(17, 17, 17, 0.12)',
} as const;

export default elevation;
