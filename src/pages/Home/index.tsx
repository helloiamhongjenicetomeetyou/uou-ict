import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { CountUp, Section, StatCard } from '@/components/common';
import {
  FACULTY,
  GENERAL_EDUCATION,
  OFFICIAL_CURRICULUM,
  SCHOOL,
  TRACKS,
  TUITION,
} from '@/data';
import { formatWon } from '@/utils';
import * as s from './style.css';

/** 1학년은 학부 공통 — 트랙과 무관하게 전원이 같은 과목을 듣는다. */
const FIRST_YEAR = OFFICIAL_CURRICULUM.common.filter(
  (course) => course.year === 1,
);

const FIRST_YEAR_CREDITS = FIRST_YEAR.reduce(
  (sum, course) => sum + course.credits,
  0,
);

const TERMS = [1, 2] as const;

const HomePage = () => {
  return (
    <div className={s.page}>
      <Section
        title={SCHOOL.name}
        note={`${SCHOOL.university} · ${SCHOOL.college} · ${SCHOOL.established}년 신설`}
        action={
          <a
            className={s.cardLink}
            href={SCHOOL.homepage}
            target="_blank"
            rel="noreferrer"
          >
            학부 홈페이지 ↗
          </a>
        }
      >
        <p className={s.lead}>{SCHOOL.summary}</p>

        <div className={s.statGrid}>
          <StatCard
            label="트랙"
            value={`${TRACKS.length}개`}
            hint="2학년부터 선택"
          />
          <StatCard
            label="1학년 공통과정"
            value={`${FIRST_YEAR_CREDITS}학점`}
            hint={`${FIRST_YEAR.length}과목 · 트랙 무관`}
          />
          <StatCard
            label="교양 이수학점"
            value={`${GENERAL_EDUCATION.totalCredits}학점`}
            hint={`${GENERAL_EDUCATION.areas.length}개 영역 합계`}
          />
          <StatCard label="교수진" value={`${FACULTY.length}명`} />
        </div>
      </Section>

      <Section
        title="1학년 공통과정"
        note={`트랙 무관 · 전원 동일 · ${FIRST_YEAR_CREDITS}학점`}
        action={
          <Link className={s.cardLink} to={ROUTES.CURRICULUM}>
            교육과정 전체 →
          </Link>
        }
        datasetUrl={OFFICIAL_CURRICULUM.source.embeddedIn}
        datasetLabel="ICT융합학부 교과과정 (UWINS 교과과정조회)"
        baseDate={`${OFFICIAL_CURRICULUM.source.year}학년도`}
      >
        <div className={s.twoUp}>
          {TERMS.map((term) => {
            const courses = FIRST_YEAR.filter((course) => course.sem === term);
            const credits = courses.reduce((sum, c) => sum + c.credits, 0);

            return (
              <div key={term} className={s.term}>
                <div className={s.termHead}>
                  <span className={s.termName}>1학년 {term}학기</span>
                  <span className={s.termCredits}>
                    <CountUp value={`${credits}학점`} />
                  </span>
                </div>

                <ul className={s.courseList}>
                  {courses.map((course) => (
                    <li key={course.code} className={s.courseRow}>
                      <span className={s.typeTag} data-type={course.type}>
                        {course.type}
                      </span>
                      <span className={s.courseName}>{course.name}</span>
                      <span className={s.courseCredits}>{course.credits}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        title="트랙"
        note="2학년부터 하나를 기본트랙으로 선택"
        action={
          <Link className={s.cardLink} to={ROUTES.CURRICULUM}>
            이수체계도 보기 →
          </Link>
        }
      >
        <div className={s.trackGrid}>
          {TRACKS.map((track) => (
            <article key={track.id} className={s.card}>
              <header className={s.cardHead}>
                <h3 className={s.cardTitle}>{track.name}</h3>
                <a
                  className={s.cardYear}
                  href={track.diagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  이수체계도 ↗
                </a>
              </header>

              <ul className={s.keywords}>
                {track.modules.map((module) => (
                  <li key={module.name} className={s.keyword}>
                    {module.name.replace(/\s*모듈$/, '')}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        title="등록금"
        note="대학 단위 · 학부별로는 공시되지 않음"
        datasetId={TUITION.datasetId}
        datasetUrl="https://www.data.go.kr/data/3071171/fileData.do"
        datasetLabel="한국장학재단 대학별 평균등록금"
        baseDate={TUITION.baseDate}
      >
        <div className={s.pairGrid}>
          <StatCard
            label="연간 평균등록금"
            value={formatWon(TUITION.averageTuition)}
            hint={`${TUITION.foundation} · ${TUITION.region}`}
          />
          <StatCard
            label="입학금"
            value={formatWon(TUITION.admissionFee)}
            hint="폐지 완료"
          />
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
