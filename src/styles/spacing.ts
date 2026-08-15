/**
 * 간격 토큰.
 * 모든 요소 간격은 4/8 배수(8배수 권장)로 구성한다.
 * 4 / 8 / 16 / 24 / 32 / 48 의 차이는 정보 간 관계의 위계를 나타낸다.
 */
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const;

export default spacing;
