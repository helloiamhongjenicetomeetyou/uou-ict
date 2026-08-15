import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { OpenDataError } from '@/types';

/** 4xx(클라이언트 오류)와 인증키 오류는 재시도해도 결과가 같으므로 걸러낸다. */
const isPermanentFailure = (error: unknown): boolean => {
  if (error instanceof OpenDataError) return true;

  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  return status !== undefined && status >= 400 && status < 500;
};

/**
 * 앱 전역에서 재사용하는 QueryClient 기본 설정.
 * 공시 데이터는 연 1~2회만 갱신되므로 staleTime 을 길게 잡는다.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000, // 30분 동안은 fresh 취급
      gcTime: 60 * 60 * 1000, // 1시간 뒤 캐시 GC
      retry: (failureCount, error) =>
        !isPermanentFailure(error) && failureCount < 1,
      refetchOnWindowFocus: false,
    },
  },
});
