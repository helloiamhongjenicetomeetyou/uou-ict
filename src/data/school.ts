/**
 * ICT융합학부 기본 정보.
 *
 * 출처는 학부 홈페이지(ict.ulsan.ac.kr)와 UWINS 교과과정조회(2026학년도)다.
 * 확인되지 않은 값은 아예 두지 않는다 — 지어낸 값은 없다.
 */

export const SCHOOL = {
  name: 'ICT융합학부',
  college: '미래엔지니어링융합대학',
  university: '울산대학교',
  homepage: 'https://ict.ulsan.ac.kr/ict',

  /** 글로컬대학30 학사구조 개편으로 신설된 해. */
  established: 2025,

  summary:
    '1학년은 트랙 구분 없이 학부 공통과정을 함께 듣고, 2학년부터 5개 트랙 가운데 기본트랙을 골라 이수한다.',
} as const;
