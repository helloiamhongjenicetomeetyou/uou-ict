/**
 * 움직임 공통 규칙.
 *
 * 움직임 줄이기를 켠 사용자에게는 연출을 전부 걷어내고 결과만 즉시 보여준다.
 * 카운팅도 스크롤도 예외가 아니다 — 연출보다 접근성이 먼저다.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 앵커가 고정 요소에 딱 붙지 않도록 남기는 여백. */
const GAP = 12;

/** 지금 실제로 고정돼 있는 요소만 높이를 센다. 좁은 화면에서는 조작 줄이 풀린다. */
const stuckHeight = (selector: string): number => {
  const element = document.querySelector(selector);
  if (!element) return 0;

  const { position } = getComputedStyle(element);
  if (position !== 'sticky' && position !== 'fixed') return 0;

  return element.getBoundingClientRect().height;
};

/**
 * 섹션 앵커로 스크롤한다.
 *
 * 높이를 상수로 박지 않고 그때그때 재는 이유는 헤더가 태블릿 이하에서 2줄로 접히고,
 * 스티키 조작 줄도 폭에 따라 접히거나 풀리기 때문이다. 잘못 재면 제목이 가려진다.
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
