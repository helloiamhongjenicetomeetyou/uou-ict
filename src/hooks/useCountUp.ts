import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/utils';

const easeOut = (progress: number): number => 1 - (1 - progress) ** 3;

/**
 * 값이 바뀌면 0 이 아니라 지금 보이는 숫자에서 이어서 굴린다.
 * 매번 0부터 세면 값이 바뀐 건지 화면이 새로 그려진 건지 구분되지 않는다.
 */
export const useCountUp = (target: number, duration = 800): number => {
  const reduced = prefersReducedMotion();
  const [value, setValue] = useState(0);
  /** 렌더 중에는 읽지 않는다. */
  const current = useRef(0);

  useEffect(() => {
    if (reduced) return;

    const from = current.current;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const next = from + (target - from) * easeOut(progress);

      current.current = next;
      setValue(next);

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, reduced]);

  return reduced ? target : value;
};
