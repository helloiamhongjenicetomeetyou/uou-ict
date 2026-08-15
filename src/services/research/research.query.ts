import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { hasDataGoKey } from '@/api';
import { queryKeys } from '@/constants';
import type { ResearchSearchParams } from '@/types';
import { searchResearch } from './research.api';

/**
 * KCI 논문 검색.
 * 인증키가 없으면 아예 요청하지 않는다 — 가짜 결과로 화면을 채우느니
 * "키를 넣어야 한다"고 말하는 편이 정직하다.
 */
export const useResearchSearch = (params: ResearchSearchParams) =>
  useQuery({
    queryKey: queryKeys.research.search(params),
    queryFn: () => searchResearch(params),
    enabled: hasDataGoKey(),
    placeholderData: keepPreviousData,
  });
