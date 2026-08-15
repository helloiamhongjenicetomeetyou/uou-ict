import { api, OPENAPI_PREFIX, unwrapDataGo } from '@/api';
import { UNIVERSITY_NAME } from '@/constants';
import type {
  DataGoResponse,
  ResearchSearchParams,
  ResearchSearchResult,
} from '@/types';

/**
 * ⚠️ 경로·파라미터명은 데이터셋 페이지의 활용가이드(PDF)를 보고 확정해야 한다.
 * KCI 는 포털 경유(15085348) 외에 kci.go.kr 자체 오픈API 도 있고 파라미터가 서로 다르다.
 */
const KCI_ENDPOINT = `${OPENAPI_PREFIX.datago}/B552691/openapi/kciArticleService`;

/** ICT융합학부 분야 기본 검색어. 5개 트랙 이름에서 뽑았다. */
export const FIELD_KEYWORDS = [
  '컴퓨터공학',
  '인공지능',
  '산업ICT',
  '산업안전',
  '데이터응용수학',
];

interface KciRawArticle {
  articleId?: string;
  title?: string;
  author?: string;
  journalName?: string;
  pubYear?: string;
  category?: string;
  citationCount?: string;
  url?: string;
  openAccess?: string;
}

const toNumber = (value: string | undefined): number | null => {
  if (!value) return null;
  const parsed = Number(value.replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
};

/** KCI 논문 검색. 소속기관을 울산대학교로 고정하고 분야 키워드를 얹는다. */
export const searchResearch = async (
  params: ResearchSearchParams,
): Promise<ResearchSearchResult> => {
  const page = params.page ?? 1;
  const size = params.size ?? 20;

  const payload = await api.get<DataGoResponse<KciRawArticle> | string>(
    KCI_ENDPOINT,
    {
      params: {
        pageNo: page,
        numOfRows: size,
        type: 'json',
        institutionName: UNIVERSITY_NAME,
        keyword: params.keyword?.trim() || FIELD_KEYWORDS.join(' '),
      },
    },
  );

  const items = unwrapDataGo<KciRawArticle>(payload);

  return {
    articles: items.map((raw) => ({
      articleId: raw.articleId ?? crypto.randomUUID(),
      title: raw.title ?? '(제목 없음)',
      authors:
        raw.author
          ?.split(/[,;]/)
          .map((name) => name.trim())
          .filter(Boolean) ?? [],
      journalName: raw.journalName ?? null,
      publishedYear: toNumber(raw.pubYear),
      category: raw.category ?? null,
      citationCount: toNumber(raw.citationCount),
      url: raw.url ?? null,
      openAccess: raw.openAccess === 'Y',
    })),
    totalCount: items.length,
    page,
    size,
  };
};
