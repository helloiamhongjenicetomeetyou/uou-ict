import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { OpenDataError, type DataGoResponse } from '@/types';

/** 공공데이터포털 정상 응답 코드. 그 외는 전부 실패로 본다. */
const DATAGO_SUCCESS_CODE = '00';

/** 프록시 프리픽스 — vite.config.ts 의 PROXY_TARGETS 와 짝을 이룬다. */
export const OPENAPI_PREFIX = {
  datago: '/openapi/datago',
} as const;

export const DATAGO_SERVICE_KEY = import.meta.env.VITE_DATAGO_SERVICE_KEY ?? '';

/** 인증키가 없으면 오픈API 화면은 "키를 넣으라"고만 안내한다. */
export const hasDataGoKey = () => DATAGO_SERVICE_KEY.length > 0;

/**
 * 공용 axios 인스턴스.
 * baseURL 은 비워두는 게 기본값이다. `/openapi/*` 가 같은 출처로 나가고
 * 개발 서버 프록시가 공공데이터포털로 넘긴다. (오픈API 는 CORS 헤더를 주지 않는다)
 */
export const http = axios.create({
  baseURL: import.meta.env.VITE_OPENAPI_BASE_URL,
  timeout: 15_000,
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

/**
 * 공공데이터포털 응답 봉투를 벗겨 items 배열만 돌려준다.
 * 포털은 실패해도 HTTP 200 으로 내려주면서 header.resultCode 로만 알리고,
 * 인증키가 틀리면 아예 XML 문자열이 오기도 해서 두 경우를 모두 막는다.
 */
export const unwrapDataGo = <T>(payload: DataGoResponse<T> | string): T[] => {
  if (typeof payload === 'string') {
    const reason = payload.match(/<returnAuthMsg>(.*?)<\/returnAuthMsg>/)?.[1];
    throw new OpenDataError(
      reason
        ? `공공데이터포털이 요청을 거부했어요: ${reason}`
        : '공공데이터포털이 JSON 이 아닌 응답을 보냈어요. 인증키를 확인해 주세요.',
    );
  }

  const header = payload?.response?.header;
  if (header && header.resultCode !== DATAGO_SUCCESS_CODE) {
    throw new OpenDataError(
      `${header.resultMsg} (resultCode ${header.resultCode})`,
      header.resultCode,
    );
  }

  const items = payload?.response?.body?.items;
  if (!items) return [];
  return Array.isArray(items) ? items : (items.item ?? []);
};

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    http.get<T>(url, config).then((res: AxiosResponse<T>) => res.data),
};
