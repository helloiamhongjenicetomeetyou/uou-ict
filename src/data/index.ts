import officialCurriculumJson from './officialCurriculum.json';
import type { OfficialCurriculum } from '@/types';

export { SCHOOL } from './school';
export { FACULTY, RANK_LABEL } from './faculty';
export { TUITION } from './publicData';
export { TRACKS, TRACK_RULES } from './curriculum';
export { GENERAL_EDUCATION } from './generalEducation';

/**
 * UWINS 교과과정조회(2026학년도) 결과. 출처는 ict.ulsan.ac.kr/ict/6855.
 * 2025년 신설이라 1·2학년만 개설돼 있고, 3·4학년은 이수체계도(TRACKS)의 계획뿐이다.
 */
export const OFFICIAL_CURRICULUM =
  officialCurriculumJson as unknown as OfficialCurriculum;
