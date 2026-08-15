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
