import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/utils';
import * as s from './style.css';

/** 이만큼 내려오면 표 한가운데라 상단 조작 줄이 보이지 않는다. */
const THRESHOLD = 400;

/**
 * 맨 위로 버튼.
 *
 * 이 서비스의 화면은 표가 세로로 길어 한 번 내려가면 돌아오는 길이 멀다.
 * 평소엔 없는 셈 치도록 옅게 물러나 있고, 스크롤이 깊어질 때만 나타난다.
 */
const ScrollTopButton = () => {
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && window.scrollY > THRESHOLD,
  );

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={visible ? s.visible : s.hidden}
      aria-label="맨 위로"
      title="맨 위로"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        })
      }
    >
      ↑
    </button>
  );
};

export default ScrollTopButton;
