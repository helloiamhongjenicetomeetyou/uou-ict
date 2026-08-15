export const ROUTES = {
  HOME: '/',
  CURRICULUM: '/curriculum',
  FACULTY: '/faculty',
} as const;

export const NAV_ITEMS = [
  { to: ROUTES.HOME, label: '개요' },
  { to: ROUTES.CURRICULUM, label: '교육과정' },
  { to: ROUTES.FACULTY, label: '교수진' },
] as const;
