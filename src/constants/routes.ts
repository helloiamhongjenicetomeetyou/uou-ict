/**
 * 라우트 경로 상수. Link/navigate 에서 문자열 하드코딩 대신 사용.
 */
export const ROUTES = {
  HOME: '/',
  CURRICULUM: '/curriculum',
  FACULTY: '/faculty',
} as const;

/** 상단 내비게이션에 노출할 순서와 라벨. */
export const NAV_ITEMS = [
  { to: ROUTES.HOME, label: '개요' },
  { to: ROUTES.CURRICULUM, label: '교육과정' },
  { to: ROUTES.FACULTY, label: '교수진' },
] as const;
