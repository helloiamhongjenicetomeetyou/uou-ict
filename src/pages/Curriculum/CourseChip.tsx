import type { Course } from '@/types';
import * as s from './style.css';

interface Props {
  course: Course;
  showCredits: boolean;
}

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
