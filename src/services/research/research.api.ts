import { api, OPENAPI_PREFIX } from '@/api';
import {
  OpenDataError,
  type ResearchArticle,
  type ResearchSearchParams,
  type ResearchSearchResult,
} from '@/types';

/**
 * KCI 논문 정보 조회 — 공공데이터포털 15085348(한국연구재단 KCI 논문정보서비스),
 * 기술문서 「KCI_논문정보」 상세기능 17 [KCI논문 정보 조회] 기준.
 *
 * 응답은 **XML 로만** 온다. 이 서비스에는 json 옵션이 없다.
 * 검색 조건은 논문명(artiNm) 하나뿐이다. 저자명·발행연도로는 찾을 수 없다.
 */
const KCI_ARTICLE_LIST = `${OPENAPI_PREFIX.datago}/B552540/KCIOpenApi/artiInfo/openApiM310List`;

/**
 * 소속기관 필터를 넣지 않은 이유 — 실제로 해보고 접었다.
 *
 * 요청에 insiId(기관ID)를 얹을 수는 있다. 기관 정보 서비스(15084667)로 조회하면
 * 울산대학교는 INS000067516 이다. 그런데 논문에 붙은 INSI_ID 는 **저자 소속이 아니라
 * 학술지 발행기관**이었다 — 샘플 논문의 INS000001925 를 되짚으니 한국분석철학회였다.
 * 그래서 울산대 ID 로 거르면 '울산대가 펴내는 학술지의 논문'만 남아 대부분 0건이고,
 * insiId 만으로 조회하면 포털이 60초를 넘겨 504 로 끊는다.
 */

/** KCI 논문 상세 화면. 논문ID 하나로 열린다. */
const articleUrl = (articleId: string) =>
  `https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=${articleId}`;

/** 트랙 이름에서 뽑은 추천 검색어. 빈 화면에 뭘 쳐야 할지 알려주려고 둔다. */
export const FIELD_KEYWORDS = [
  '컴퓨터공학',
  '인공지능',
  '산업ICT',
  '산업안전',
  '데이터응용수학',
];

const field = (item: Element, tag: string): string =>
  item.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';

const optional = (value: string): string | null => value || null;

const toNumber = (value: string): number | null => {
  if (!value) return null;
  const parsed = Number(value.replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
};

/** 쉼표·세미콜론으로 붙어 오는 키워드 묶음을 쪼갠다. 빈 값이 흔하다. */
const toKeywords = (value: string): string[] =>
  value
    .split(/[,;]/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);

/**
 * 포털 XML 을 벗긴다.
 *
 * 인증에 실패하면 `<response>` 대신 `<OpenAPI_ServiceResponse>` 봉투에
 * returnAuthMsg 로 이유가 담겨 오고, HTTP 상태는 400·403 으로 제각각이다.
 */
const parseArticles = (xml: string): ResearchSearchResult => {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');

  if (doc.getElementsByTagName('parsererror').length > 0) {
    throw new OpenDataError('공공데이터포털 응답을 해석하지 못했어요.');
  }

  const authMessage = doc
    .getElementsByTagName('returnAuthMsg')[0]
    ?.textContent?.trim();
  if (authMessage) {
    throw new OpenDataError(
      `공공데이터포털이 요청을 거부했어요: ${authMessage}`,
      doc.getElementsByTagName('returnReasonCode')[0]?.textContent ?? undefined,
    );
  }

  const resultCode =
    doc.getElementsByTagName('resultCode')[0]?.textContent?.trim() ?? '';
  if (resultCode && resultCode !== '00') {
    const message =
      doc.getElementsByTagName('resultMsg')[0]?.textContent?.trim() ??
      '알 수 없는 오류';
    throw new OpenDataError(`${message} (resultCode ${resultCode})`, resultCode);
  }

  const items = Array.from(doc.getElementsByTagName('item'));

  const articles: ResearchArticle[] = items.map((item) => {
    const articleId = field(item, 'ARTI_ID');
    const first = field(item, 'FIRS_PG');
    const last = field(item, 'FINI_PG');

    return {
      articleId,
      title:
        field(item, 'ARTI_KOR_TITL') ||
        field(item, 'ARTI_ENG_TITL') ||
        field(item, 'ARTI_FOLA_TITL') ||
        '(제목 없음)',
      englishTitle: optional(field(item, 'ARTI_ENG_TITL')),
      keywords: toKeywords(
        field(item, 'KOR_KEYW') || field(item, 'ENG_KEYW'),
      ),
      pages: first && last ? `${first}–${last}` : null,
      /** 원문(PDF)이 KCI 에 올라와 있는지. */
      fullText: field(item, 'ORTE_YN') === 'Y',
      citationCount: toNumber(field(item, 'WOS_CITE_CNT')),
      doi: optional(field(item, 'DOI')),
      url: articleId ? articleUrl(articleId) : null,
    };
  });

  const number = (tag: string) =>
    toNumber(doc.getElementsByTagName(tag)[0]?.textContent ?? '') ?? 0;

  return {
    articles,
    totalCount: number('totalCount'),
    page: number('pageNo') || 1,
    size: number('recordCnt') || articles.length,
  };
};

/** 논문명으로 KCI 논문을 찾는다. 검색어가 없으면 요청하지 않는다. */
export const searchResearch = async (
  params: ResearchSearchParams,
): Promise<ResearchSearchResult> => {
  const keyword = params.keyword?.trim() ?? '';
  if (!keyword) return { articles: [], totalCount: 0, page: 1, size: 0 };

  const xml = await api.get<string>(KCI_ARTICLE_LIST, {
    params: {
      pageNo: params.page ?? 1,
      recordCnt: params.size ?? 20,
      artiNm: keyword,
    },
  });

  return parseArticles(xml);
};
