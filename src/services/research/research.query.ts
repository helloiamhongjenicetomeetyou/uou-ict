import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { hasDataGoKey } from '@/api';
import { queryKeys } from '@/constants';
import type { ResearchSearchParams } from '@/types';
import { searchResearch } from './research.api';

/**
 * KCI 논문 검색.
 *
 * 인증키가 없으면 아예 요청하지 않는다 — 가짜 결과로 화면을 채우느니
 * "키를 넣어야 한다"고 말하는 편이 정직하다.
 * 검색어가 비었을 때도 마찬가지다. 논문명이 없으면 포털은 전체 180만 건을
 * 순서대로 돌려주는데, 그건 검색 결과가 아니라 그냥 목록의 앞부분이다.
 */
export const useResearchSearch = (params: ResearchSearchParams) =>
  useQuery({
    queryKey: queryKeys.research.search(params),
    queryFn: () => searchResearch(params),
    enabled: hasDataGoKey() && (params.keyword?.trim().length ?? 0) > 0,
    placeholderData: keepPreviousData,
    /**
     * 한 번만 더 시도한다. 이 API 는 한 요청이 45초까지 걸려서
     * 기본값(3회)대로 재시도하면 3분을 기다리게 된다.
     */
    retry: 1,
  });
