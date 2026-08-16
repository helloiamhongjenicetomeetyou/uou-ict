import type { TuitionRecord } from '@/types';

/**
 * 울산대 「2026학년도 등록금 조견표」(www.ulsan.ac.kr, mCode=MN302)의
 * 트랙제 · 미래엔지니어링융합대학 · 전학년 행. 원본 단위는 천원이다.
 *
 *   구분 트랙제 | 학년 전학년 | 계열 미래엔지니어링융합대학 | 입학 실비용 - | 등록금 4,327
 *
 * 조견표 금액은 학기당이다. 같은 표의 계열별 학기 등록금 평균(약 398만원)이
 * 한국장학재단이 공시한 울산대 연간 평균등록금 796만원의 절반과 맞아떨어진다.
 */
export const TUITION: TuitionRecord = {
  college: '미래엔지니어링융합대학',
  semester: 4_327_000,
  /** 2학기 기준. 계절학기·초과학기는 따로다. */
  year: 8_654_000,
  /** 조견표의 '입학 실비용' 칸이 '-' 다. 입학금은 폐지됐다. */
  admissionFee: 0,
  source: 'https://www.ulsan.ac.kr/kor/CMS/Contents/Contents.do?mCode=MN302',
  baseYear: 2026,
};

/**
 * 비교용 — 한국장학재단 대학별 평균등록금(3071171, 2026-05-19)의 울산대 행.
 * 원본: "대학","사립","울산대학교","울산","10821","0","7966453.2"
 * 대학 전체 평균이라 학부별로는 쪼개지지 않는다.
 */
export const UNIVERSITY_AVERAGE_TUITION = {
  year: 7_966_453,
  datasetId: '3071171',
  url: 'https://www.data.go.kr/data/3071171/fileData.do',
  baseDate: '2026-05-19',
} as const;
