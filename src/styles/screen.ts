/**
 * 반응형 브레이크포인트.
 * media query 안에서 `@media (max-width: ${screen.phone})` 형태로 사용.
 */
const screen = {
  desktop: '1280px',
  tablet: '1024px',
  phone: '768px',
  mobile: '480px',
} as const;

export default screen;
