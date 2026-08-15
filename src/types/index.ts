/**
 * 이 서비스의 도메인 타입.
 *
 * 데이터는 두 갈래다.
 *  - 학부 사실   : 공식 홈페이지·공시에서 확인해 `src/data/` 에 적어둔 값. 전부 실제 값이다.
 *  - 오픈API     : 인증키가 있어야 도는 것 (현재는 KCI 논문뿐).
 * 지어낸 샘플 값은 두지 않는다. 모르는 값은 null 로 두고 화면에 '—' 로 찍는다.
 */

export type FacultyRank = 'PROFESSOR' | 'ASSOCIATE' | 'ASSISTANT';

export interface FacultyMember {
  name: string;
  rank: FacultyRank;
  /** 빈 배열은 '없음'이 아니라 '공개 안 됨'. */
  fields: string[];
  tel?: string;
  email?: string;
  note?: string;
}

export interface TuitionRecord {
  schoolType: string;
  foundation: string;
  region: string;
  quotaRaw: number;
  admissionFee: number;
  averageTuition: number;
  datasetId: string;
  baseDate: string;
}

/* ── 교육과정 ──────────────────────────────────────────────────── */

export type TrackId = 'CSE' | 'AI' | 'IICT' | 'SAFETY' | 'MATH';

/** 이수체계도의 색 구분. */
export type CourseCategory = '전공필수' | '전공선택' | '전공공통';

export interface Course {
  name: string;
  /** 이수체계도에 학점이 없는 트랙은 null. 0학점 과목과 구분된다. */
  credits: number | null;
  year: 2 | 3 | 4;
  semester: 1 | 2;
  category: CourseCategory;
  /** 이수체계도의 파란 점 = 기본트랙 과목. */
  baseTrack?: boolean;
  module: string;
}

export interface TrackModule {
  name: string;
  credits?: number;
  jobs?: string[];
  certificates?: string[];
}

export interface Track {
  id: TrackId;
  name: string;
  diagramUrl: string;
  /** 이수체계도에 기본트랙 표시가 있는 트랙인지. */
  hasBaseTrackMark: boolean;
  /** 이수체계도에 학점 표기가 없는 트랙. */
  creditsUnknown?: boolean;
  note?: string;
  modules: TrackModule[];
  courses: Course[];
}

/** UWINS 교과과정조회의 이수구분. */
export type EnrollmentType = '전필' | '전선' | '교필' | '교선';

/** UWINS 에서 그대로 가져온 개설 교과목 한 행. */
export interface OfficialCourse {
  year: number;
  sem: number;
  type: EnrollmentType;
  /** ABEEK 구분. 빈 문자열이면 미지정. */
  abeek: string;
  code: string;
  name: string;
  credits: number;
}

export interface OfficialTrack {
  trackId: TrackId;
  name: string;
  /** 기본트랙(33학점) / 통합트랙(66학점). */
  variant: '기본' | '통합';
  courses: OfficialCourse[];
}

export interface OfficialCurriculum {
  source: {
    system: string;
    url: string;
    embeddedIn: string;
    year: number;
    college: string;
    collegeCode: string;
  };
  /** 학부 공통 — 1학년 전원이 듣는 과목. */
  common: OfficialCourse[];
  tracks: OfficialTrack[];
}

export type GeneralEducationAreaId =
  'FOUNDATION' | 'BALANCE' | 'FREE' | 'SCHOOL';

export interface GeneralEducationCourse {
  sub: string;
  name: string;
  credits: number;
  year: number;
  note?: string;
}

export interface GeneralEducationArea {
  id: GeneralEducationAreaId;
  name: string;
  requirement: '교양필수' | '교양선택';
  credits: number;
  rule: string;
  courses?: GeneralEducationCourse[];
  subAreas?: { name: string; courses: string[] }[];
  /** 학부교양처럼 과목 목록이 공개되지 않은 영역. */
  coursesUnpublished?: boolean;
}

export interface GeneralEducation {
  source: string;
  courseListSource: string;
  baseDate: string;
  totalCredits: number;
  areas: GeneralEducationArea[];
}

/* ── 오픈API (KCI) ─────────────────────────────────────────────── */

export interface ResearchSearchParams {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface ResearchArticle {
  articleId: string;
  title: string;
  authors: string[];
  journalName: string | null;
  publishedYear: number | null;
  category: string | null;
  citationCount: number | null;
  url: string | null;
  openAccess: boolean;
}

export interface ResearchSearchResult {
  articles: ResearchArticle[];
  totalCount: number;
  page: number;
  size: number;
}

/** 공공데이터포털 오픈API 공통 응답 봉투. */
export interface DataGoResponse<T> {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items: { item: T[] } | T[];
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export class OpenDataError extends Error {
  readonly resultCode?: string;

  constructor(message: string, resultCode?: string) {
    super(message);
    this.name = 'OpenDataError';
    this.resultCode = resultCode;
  }
}
