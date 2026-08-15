import type { TuitionRecord } from '@/types';

/**
 * 실제로 내려받아 울산대 행을 확인한 공공데이터.
 *
 * 한국장학재단_대학별_평균등록금_20260519.csv 원본 행:
 *   "대학","사립","울산대학교","울산","10821","0","7966453.2"
 *
 * 대학 단위 값이라 학부별로는 쪼개지지 않는다.
 */
export const TUITION: TuitionRecord = {
  schoolType: '대학',
  foundation: '사립',
  region: '울산',
  /** 원본 컬럼명은 '입학정원'이지만 값이 1만을 넘어 편제정원으로 읽힌다. */
  quotaRaw: 10821,
  admissionFee: 0,
  averageTuition: 7_966_453,
  datasetId: '3071171',
  baseDate: '2026-05-19',
};
