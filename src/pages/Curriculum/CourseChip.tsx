import type { Course } from '@/types';
import * as s from './style.css';

interface Props {
  course: Course;
  showCredits: boolean;
}

/**
 * 이수체계도의 과목 한 칸.
 * 원본과 같이 왼쪽 색 막대로 분류를 표시하고, 기본트랙 과목에는 점을 찍는다.
 */
const CourseChip = ({ course, showCredits }: Props) => (
  <span className={s.course} data-category={course.category}>
    <span className={s.courseName}>{course.name}</span>
    {showCredits && course.credits != null && (
      <span className={s.courseCredit}>{course.credits}</span>
    )}
    {course.baseTrack && (
      <span className={s.courseDot} aria-label="기본트랙 과목" />
    )}
  </span>
);

export default CourseChip;
