import officialCurriculumJson from './officialCurriculum.json';
import type { OfficialCurriculum } from '@/types';

export { SCHOOL } from './school';
export { FACULTY, RANK_LABEL } from './faculty';
export { TUITION } from './publicData';
export { TRACKS, TRACK_RULES } from './curriculum';
export { GENERAL_EDUCATION } from './generalEducation';

/**
 * UWINS 교과과정조회(2026학년도)에서 실제 개설된 교과목.
 * ict.ulsan.ac.kr/ict/6855 에 iframe 으로 붙어 있는 그 시스템이다.
 *
 * ICT융합학부는 2025년 신설이라 2026 기준으로 1·2학년만 개설돼 있다.
 * 3·4학년은 아직 열리지 않았고, 이수체계도(TRACKS)의 계획으로만 존재한다.
 */
export const OFFICIAL_CURRICULUM =
  officialCurriculumJson as unknown as OfficialCurriculum;
