import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/utils';
import * as s from './style.css';

const THRESHOLD = 400;

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
