import { useCallback, useEffect, useState } from 'react';

/** 저장 키. 담는 모양이 바뀌면 뒤의 버전을 올려 예전 값을 버린다. */
const STORAGE_KEY = 'uou-ict:completed-courses:v1';

const read = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed)
      ? parsed.filter((code): code is string => typeof code === 'string')
      : [];
  } catch {
    /* 시크릿 모드 등에서 localStorage 자체가 막힐 수 있다. 그래도 화면은 돌아야 한다. */
    return [];
  }
};

const write = (codes: Set<string>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...codes]));
  } catch {
    /* 저장이 막혀도 이번 방문 동안은 체크가 유지된다. */
  }
};

/**
 * 내가 이수한 과목 코드 모음.
 *
 * 이 브라우저에만 남는다 — 서버도 계정도 없다. 그래서 화면에도 그렇게 적어 둔다.
 * 과목코드로 저장하므로 트랙을 바꿔도, 같은 과목이 다른 트랙에 겹쳐 나와도 체크가 따라간다.
 */
export const useCompletedCourses = () => {
  const [completed, setCompleted] = useState<Set<string>>(
    () => new Set(read()),
  );

  useEffect(() => {
    write(completed);
  }, [completed]);

  const toggle = useCallback((code: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      /* delete 가 false 면 없던 것 — 그때 넣는다. */
      if (!next.delete(code)) next.add(code);
      return next;
    });
  }, []);

  const clear = useCallback(() => setCompleted(new Set()), []);

  return { completed, toggle, clear };
};
