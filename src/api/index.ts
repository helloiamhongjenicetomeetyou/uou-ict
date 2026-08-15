import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { OpenDataError } from '@/types';

/** 프록시 프리픽스 — vite.config.ts 의 PROXY_TARGETS 와 짝을 이룬다. */
export const OPENAPI_PREFIX = {
  datago: '/openapi/datago',
} as const;

/**
 * 인증키를 디코딩된 형태로 맞춘다.
 *
 * 포털은 같은 키를 Encoding / Decoding 두 벌로 준다. Encoding 키를 그대로 넣으면
 * axios 가 한 번 더 인코딩해 `%3D` 가 `%253D` 가 되고, 포털은 등록되지 않은
 * 서비스키(403)라고 답한다. 어느 쪽을 붙여넣든 돌아가게 여기서 한 번 풀어 둔다.
 */
const normalizeServiceKey = (key: string): string => {
  if (!key.includes('%')) return key;
  try {
    return decodeURIComponent(key);
  } catch {
    /* 키에 우연히 %가 들어간 경우 — 건드리지 않는다. */
    return key;
  }
};

export const DATAGO_SERVICE_KEY = normalizeServiceKey(
  import.meta.env.VITE_DATAGO_SERVICE_KEY ?? '',
);

/** 인증키가 없으면 오픈API 화면은 "키를 넣으라"고만 안내한다. */
export const hasDataGoKey = () => DATAGO_SERVICE_KEY.length > 0;

/**
 * 공용 axios 인스턴스.
 * baseURL 은 비워두는 게 기본값이다. `/openapi/*` 가 같은 출처로 나가고
 * 개발 서버 프록시가 공공데이터포털로 넘긴다. (오픈API 는 CORS 헤더를 주지 않는다)
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_OPENAPI_BASE_URL,
  /**
   * KCI 논문 조회는 느리다. 재보면 '인공지능'(6,378건)은 4초인데
   * '컴퓨터공학'(14건)은 30초를 넘긴다 — 결과 수가 아니라 포털 쪽 검색 성능 문제다.
   * 짧게 끊으면 멀쩡한 요청이 타임아웃으로 죽는다.
   */
  timeout: 45_000,
  headers: { Accept: 'application/json' },
});

/* 요청 인터셉터 — 인증키를 쿼리스트링에 자동으로 붙인다. */
http.interceptors.request.use((config) => {
  if ((config.url ?? '').startsWith(OPENAPI_PREFIX.datago)) {
    config.params = { serviceKey: DATAGO_SERVICE_KEY, ...config.params };
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      console.error(
        '[OPEN DATA ERROR]',
        error.response?.status,
        error.config?.url,
        error.message,
      );
    }
    return Promise.reject(error);
  },
);

/** 실패 응답에서 사람이 읽을 메시지를 뽑아낸다. */
export const getApiErrorMessage = (
  error: unknown,
  fallback = '데이터를 불러오지 못했어요.',
): string => {
  if (error instanceof OpenDataError) return error.message;
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return '공공데이터포털 응답이 늦어 요청을 중단했어요.';
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      return '인증키가 거부됐어요. 디코딩된 키인지, 해당 데이터셋을 활용신청했는지 확인해 주세요.';
    }
    return error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    http.get<T>(url, config).then((res: AxiosResponse<T>) => res.data),
};
