export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const GAP = 12;

/** 지금 실제로 고정돼 있는 요소만 높이를 센다. */
const stuckHeight = (selector: string): number => {
  const element = document.querySelector(selector);
  if (!element) return 0;

  const { position } = getComputedStyle(element);
  if (position !== 'sticky' && position !== 'fixed') return 0;

  return element.getBoundingClientRect().height;
};

/**
 * 헤더 높이를 상수로 박지 않고 그때그때 재는 이유 — 헤더는 태블릿 이하에서 2줄로
 * 접히고 스티키 조작 줄도 폭에 따라 풀린다. 잘못 재면 제목이 가려진다.
 */
export const scrollToSection = (id: string): void => {
  requestAnimationFrame(() => {
    const target = document.getElementById(id);
    if (!target) return;

    const offset =
      stuckHeight('[data-app-header]') +
      stuckHeight('[data-sticky-toolbar]') +
      GAP;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  });
};
