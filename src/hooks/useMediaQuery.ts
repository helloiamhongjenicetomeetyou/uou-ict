import { useEffect, useState } from 'react';

/** 폭에 따라 조작 UI 자체가 달라지는 곳에서 쓴다. 보이기/숨기기는 CSS 로 한다. */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = (event: MediaQueryListEvent) => setMatches(event.matches);

    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, [query]);

  return matches;
};
