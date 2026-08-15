import type { ResearchSearchParams } from '@/types';

/**
 * React Query 키.
 * 서버에서 받아오는 건 KCI 논문 검색 하나뿐이라 목록이 짧다.
 * 나머지 학부 정보는 전부 정적 데이터(src/data)라 쿼리를 타지 않는다.
 */
export const queryKeys = {
  research: {
    all: ['research'] as const,
    search: (params: ResearchSearchParams) =>
      [...queryKeys.research.all, 'search', params] as const,
  },
} as const;
