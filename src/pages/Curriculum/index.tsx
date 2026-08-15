import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Chip,
  DataTable,
  numericCell,
  Section,
  StatCard,
  Toolbar,
  ToolbarGroup,
} from '@/components/common';
import {
  GENERAL_EDUCATION,
  OFFICIAL_CURRICULUM,
  TRACKS,
  TRACK_RULES,
} from '@/data';
import { useCompletedCourses } from '@/hooks';
import type {
  Course,
  CourseCategory,
  EnrollmentType,
  OfficialCourse,
  TrackId,
} from '@/types';
import { scrollToSection } from '@/utils';
import CourseChip from './CourseChip';
import * as s from './style.css';

type Variant = '기본' | '통합';
type TypeFilter = EnrollmentType | 'ALL';

/**
 * 바로가기 목록. 이 화면은 표 다섯 개가 세로로 길게 이어져서
 * 트랙을 바꾼 다음 어디를 봐야 하는지 매번 스크롤로 찾게 된다.
 */
const ANCHORS = [
  { id: 'progress', label: '내 이수' },
  { id: 'first-year', label: '1학년' },
  { id: 'courses', label: '개설 교과목' },
  { id: 'roadmap', label: '이수체계도' },
  { id: 'general', label: '교양' },
  { id: 'rules', label: '이수 규정' },
] as const;

/** 이수체계도와 같은 6개 학기 열. */
const TERMS = [
  { year: 2, semester: 1 },
  { year: 2, semester: 2 },
  { year: 3, semester: 1 },
  { year: 3, semester: 2 },
  { year: 4, semester: 1 },
  { year: 4, semester: 2 },
] as const;

const CATEGORIES: CourseCategory[] = ['전공필수', '전공공통', '전공선택'];

const TYPE_LABEL: Record<EnrollmentType, string> = {
  전필: '전공필수',
  전선: '전공선택',
  교필: '교양필수',
  교선: '교양선택',
};

const TYPE_FILTERS: EnrollmentType[] = ['전필', '전선', '교필', '교선'];

/** 전공으로 세는 이수구분. 나머지(교필·교선)는 교양으로 센다. */
const MAJOR_TYPES: EnrollmentType[] = ['전필', '전선'];

/** 트랙 이수학점. 공통트랙소개 기준 — 기본트랙 33학점, 통합트랙 66학점. */
const TRACK_CREDITS: Record<Variant, number> = { 기본: 33, 통합: 66 };

/**
 * 과목코드 → 과목.
 * 체크한 과목의 학점을 세려면 지금 보고 있는 트랙 밖의 과목도 알아야 한다.
 * 같은 과목이 여러 트랙에 겹쳐 나오므로 먼저 만난 것 하나만 남긴다.
 */
const COURSE_BY_CODE = new Map<string, OfficialCourse>();
for (const course of [
  ...OFFICIAL_CURRICULUM.common,
  ...OFFICIAL_CURRICULUM.tracks.flatMap((track) => track.courses),
]) {
  if (!COURSE_BY_CODE.has(course.code)) COURSE_BY_CODE.set(course.code, course);
}

const TRACK_IDS = new Set<string>(TRACKS.map((track) => track.id));

const asTrackId = (value: string | null): TrackId =>
  value && TRACK_IDS.has(value) ? (value as TrackId) : TRACKS[0].id;

const asVariant = (value: string | null): Variant =>
  value === '통합' ? '통합' : '기본';

const sortCourses = (a: OfficialCourse, b: OfficialCourse) =>
  a.year - b.year || a.sem - b.sem || a.type.localeCompare(b.type);

const CurriculumPage = () => {
  /** 트랙·유형은 주소에 담는다 — 새로고침해도, 링크를 받아도 같은 화면이 열린다. */
  const [params, setParams] = useSearchParams();
  const trackId = asTrackId(params.get('track'));
  const variant = asVariant(params.get('variant'));

  const [keyword, setKeyword] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL');
  const { completed, toggle, clear } = useCompletedCourses();

  const track = TRACKS.find((t) => t.id === trackId) ?? TRACKS[0];
  const official = OFFICIAL_CURRICULUM.tracks.find(
    (t) => t.trackId === trackId && t.variant === variant,
  );

  const select = useCallback(
    (next: { track?: TrackId; variant?: Variant }) => {
      const merged = new URLSearchParams(params);
      if (next.track) merged.set('track', next.track);
      if (next.variant) merged.set('variant', next.variant);

      /* replace 로 넣는다 — 트랙을 몇 번 눌렀다고 뒤로가기가 그만큼 쌓이면 곤란하다. */
      setParams(merged, { replace: true });
      scrollToSection('courses');
    },
    [params, setParams],
  );

  /** 1학년은 학부 공통 — 트랙과 무관하게 전원이 같은 과목을 듣는다. */
  const firstYear = useMemo(
    () =>
      OFFICIAL_CURRICULUM.common.filter((c) => c.year === 1).sort(sortCourses),
    [],
  );

  const officialCourses = useMemo(
    () => [...(official?.courses ?? [])].sort(sortCourses),
    [official],
  );

  const query = keyword.trim().toLowerCase();
  const filtering = query !== '' || typeFilter !== 'ALL';

  const matches = useCallback(
    (course: OfficialCourse) => {
      if (typeFilter !== 'ALL' && course.type !== typeFilter) return false;
      if (!query) return true;
      return (
        course.name.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query)
      );
    },
    [query, typeFilter],
  );

  const firstYearRows = firstYear.filter(matches);
  const officialRows = officialCourses.filter(matches);

  const officialByType = useMemo(() => {
    const map = new Map<EnrollmentType, number>();
    for (const c of official?.courses ?? []) {
      map.set(c.type, (map.get(c.type) ?? 0) + 1);
    }
    return map;
  }, [official]);

  const planStats = useMemo(() => {
    const counts = new Map<CourseCategory, number>();
    for (const course of track.courses) {
      counts.set(course.category, (counts.get(course.category) ?? 0) + 1);
    }
    return counts;
  }, [track]);

  /** 체크한 과목을 전공·교양으로 나눠 학점을 센다. */
  const progress = useMemo(() => {
    let major = 0;
    let general = 0;
    let count = 0;

    for (const code of completed) {
      const course = COURSE_BY_CODE.get(code);
      if (!course) continue;

      count += 1;
      if (MAJOR_TYPES.includes(course.type)) major += course.credits;
      else general += course.credits;
    }

    return { major, general, count };
  }, [completed]);

  const cell = (module: string, year: number, semester: number): Course[] =>
    track.courses.filter(
      (c) => c.module === module && c.year === year && c.semester === semester,
    );

  const firstYearCredits = firstYear.reduce((sum, c) => sum + c.credits, 0);
  const majorTarget = TRACK_CREDITS[variant];
  const generalTarget = GENERAL_EDUCATION.totalCredits;

  const ratio = (value: number, target: number) =>
    Math.min(Math.round((value / target) * 100), 100);

  /** 체크 칸 하나. 두 표가 같은 모양을 쓴다. */
  const checkbox = (course: OfficialCourse) => (
    <input
      type="checkbox"
      className={s.check}
      checked={completed.has(course.code)}
      onChange={() => toggle(course.code)}
      aria-label={`${course.name} 이수 완료`}
    />
  );

  return (
    <div className={s.page}>
      <Toolbar
        sticky
        trailing={
          <span className={s.stamp}>
            UWINS {OFFICIAL_CURRICULUM.source.year}학년도 기준
          </span>
        }
      >
        <ToolbarGroup label="트랙">
          {TRACKS.map((item) => (
            <Chip
              key={item.id}
              selected={item.id === trackId}
              onClick={() => select({ track: item.id })}
            >
              {item.name}
            </Chip>
          ))}
        </ToolbarGroup>

        <ToolbarGroup label="유형">
          {(['기본', '통합'] as const).map((v) => (
            <Chip
              key={v}
              selected={v === variant}
              onClick={() => select({ variant: v })}
            >
              {v}트랙
            </Chip>
          ))}
        </ToolbarGroup>

        <input
          className={s.search}
          type="search"
          value={keyword}
          placeholder="과목명·과목코드"
          aria-label="교과목 검색"
          onChange={(event) => setKeyword(event.target.value)}
        />

        <ToolbarGroup label="이수구분">
          <Chip
            selected={typeFilter === 'ALL'}
            onClick={() => setTypeFilter('ALL')}
          >
            전체
          </Chip>
          {TYPE_FILTERS.map((type) => (
            <Chip
              key={type}
              selected={typeFilter === type}
              title={TYPE_LABEL[type]}
              onClick={() => setTypeFilter(type)}
            >
              {type}
            </Chip>
          ))}
        </ToolbarGroup>

        <ToolbarGroup label="바로가기">
          {ANCHORS.map((anchor) => (
            <Chip
              key={anchor.id}
              title={`${anchor.label} 위치로 이동`}
              onClick={() => scrollToSection(anchor.id)}
            >
              {anchor.label}
            </Chip>
          ))}
        </ToolbarGroup>
      </Toolbar>

      {/* ── 내 이수 현황 ──────────────────────────────────────── */}
      <Section
        id="progress"
        title="내 이수 현황"
        note="이 브라우저에만 저장됩니다"
        action={
          progress.count > 0 && (
            <button type="button" className={s.reset} onClick={clear}>
              체크 초기화
            </button>
          )
        }
      >
        <p className={s.hint}>
          아래 표에서 들은 과목을 체크하면 학점이 더해집니다. 계정도 서버도 없이{' '}
          <b>이 브라우저에만</b> 남고, 아직 개설되지 않은 3·4학년 과목은 표에
          없으므로 지금 셀 수 있는 건 1·2학년 개설 과목까지입니다.
        </p>

        <div className={s.progressGrid}>
          <StatCard label="체크한 과목" value={`${progress.count}과목`} />
          <StatCard
            label="전공 학점"
            value={`${progress.major}학점`}
            hint={`${variant}트랙 ${majorTarget}학점 기준`}
          />
          <StatCard
            label="교양 학점"
            value={`${progress.general}학점`}
            hint={`졸업 교양 ${generalTarget}학점 기준`}
          />
        </div>

        <div className={s.meterList}>
          <div className={s.meterRow}>
            <span className={s.meterLabel}>전공</span>
            <span className={s.meter}>
              <span
                className={s.meterFill}
                style={{ width: `${ratio(progress.major, majorTarget)}%` }}
              />
            </span>
            <span className={s.meterValue}>
              {progress.major} / {majorTarget}
            </span>
          </div>

          <div className={s.meterRow}>
            <span className={s.meterLabel}>교양</span>
            <span className={s.meter}>
              <span
                className={s.meterFill}
                style={{ width: `${ratio(progress.general, generalTarget)}%` }}
              />
            </span>
            <span className={s.meterValue}>
              {progress.general} / {generalTarget}
            </span>
          </div>
        </div>
      </Section>

      {/* ── 1학년 ─────────────────────────────────────────────── */}
      <Section
        id="first-year"
        title="1학년 · 학부 공통과정"
        note={
          filtering
            ? `검색 결과 ${firstYearRows.length}과목 / 전체 ${firstYear.length}과목`
            : `트랙 무관 · 전원 동일 · ${firstYearCredits}학점`
        }
        datasetUrl={OFFICIAL_CURRICULUM.source.embeddedIn}
        datasetLabel="ICT융합학부 교과과정 (UWINS 교과과정조회)"
        baseDate={`${OFFICIAL_CURRICULUM.source.year}학년도`}
      >
        {firstYearRows.length === 0 ? (
          <p className={s.empty}>검색 조건에 맞는 과목이 없습니다.</p>
        ) : (
          <DataTable caption="ICT융합학부 1학년 학부 공통과정" minWidth={720}>
            <thead>
              <tr>
                <th scope="col" className={s.checkHead}>
                  이수
                </th>
                <th scope="col">학기</th>
                <th scope="col">이수구분</th>
                <th scope="col">과목코드</th>
                <th scope="col">교과목명</th>
                <th scope="col" className={numericCell}>
                  학점
                </th>
                <th scope="col">ABEEK</th>
              </tr>
            </thead>
            <tbody>
              {firstYearRows.map((course) => (
                <tr
                  key={course.code}
                  data-done={completed.has(course.code) ? '' : undefined}
                >
                  <td className={s.checkCell}>{checkbox(course)}</td>
                  <td>{course.sem}학기</td>
                  <td>
                    <span className={s.typeTag} data-type={course.type}>
                      {TYPE_LABEL[course.type]}
                    </span>
                  </td>
                  <td className={s.code}>{course.code}</td>
                  <th scope="row">{course.name}</th>
                  <td className={numericCell}>{course.credits}</td>
                  <td className={s.abeek}>{course.abeek || '—'}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        )}
      </Section>

      {/* ── 2학년~ 실제 개설 ──────────────────────────────────── */}
      <Section
        id="courses"
        title={`${track.name} ${variant}트랙 · 개설 교과목`}
        note={
          !official
            ? '개설 정보 없음'
            : filtering
              ? `검색 결과 ${officialRows.length}과목 / 전체 ${officialCourses.length}과목`
              : `${official.courses.length}과목 · ${[...officialByType]
                  .map(([t, n]) => `${TYPE_LABEL[t]} ${n}`)
                  .join(' · ')}`
        }
        datasetUrl={OFFICIAL_CURRICULUM.source.embeddedIn}
        datasetLabel="UWINS 교과과정조회"
        baseDate={`${OFFICIAL_CURRICULUM.source.year}학년도`}
      >
        <p className={s.notice}>
          ICT융합학부는 2025년 신설이라 {OFFICIAL_CURRICULUM.source.year}학년도
          기준으로 <b>1·2학년까지만 개설</b>돼 있습니다. 3·4학년 과목은 아래
          이수체계도의 계획으로만 존재합니다.
        </p>

        {official &&
          (officialRows.length === 0 ? (
            <p className={s.empty}>검색 조건에 맞는 과목이 없습니다.</p>
          ) : (
            <DataTable
              caption={`${track.name} ${variant}트랙 개설 교과목`}
              minWidth={720}
            >
              <thead>
                <tr>
                  <th scope="col" className={s.checkHead}>
                    이수
                  </th>
                  <th scope="col">학년-학기</th>
                  <th scope="col">이수구분</th>
                  <th scope="col">과목코드</th>
                  <th scope="col">교과목명</th>
                  <th scope="col" className={numericCell}>
                    학점
                  </th>
                  <th scope="col">ABEEK</th>
                </tr>
              </thead>
              <tbody>
                {officialRows.map((course) => (
                  <tr
                    key={`${course.code}-${course.year}-${course.sem}`}
                    data-done={completed.has(course.code) ? '' : undefined}
                  >
                    <td className={s.checkCell}>{checkbox(course)}</td>
                    <td>
                      {course.year}-{course.sem}
                    </td>
                    <td>
                      <span className={s.typeTag} data-type={course.type}>
                        {TYPE_LABEL[course.type]}
                      </span>
                    </td>
                    <td className={s.code}>{course.code}</td>
                    <th scope="row">{course.name}</th>
                    <td className={numericCell}>{course.credits}</td>
                    <td className={s.abeek}>{course.abeek || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          ))}
      </Section>

      {/* ── 2~4학년 이수체계도 (계획) ─────────────────────────── */}
      <Section
        id="roadmap"
        title={`${track.name} 트랙 이수체계도`}
        note="학부가 공개한 4년 전체 로드맵 · 실제 개설과 과목명이 다를 수 있음"
        action={
          <a
            className={s.diagramLink}
            href={track.diagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            원본 ↗
          </a>
        }
        datasetUrl={track.diagramUrl}
        datasetLabel={`ICT융합학부 ${track.name} 트랙 이수체계도`}
      >
        <div className={s.legend}>
          {CATEGORIES.map((category) => {
            const count = planStats.get(category) ?? 0;
            if (count === 0) return null;
            return (
              <span key={category} className={s.legendItem}>
                <span
                  className={s.swatch}
                  data-category={category}
                  aria-hidden
                />
                {category} {count}
              </span>
            );
          })}
          {track.hasBaseTrackMark && (
            <span className={s.legendItem}>
              <span className={s.baseDot} aria-hidden />
              기본트랙 과목
            </span>
          )}
        </div>

        {track.note && <p className={s.trackNote}>{track.note}</p>}

        <div className={s.gridScroll}>
          <div className={s.grid}>
            <div className={s.gridHead}>
              <span className={s.moduleHead}>모듈</span>
              {TERMS.map((term) => (
                <span
                  key={`${term.year}-${term.semester}`}
                  className={s.termHead}
                >
                  {term.year}학년 {term.semester}학기
                </span>
              ))}
            </div>

            {track.modules.map((module) => (
              <div key={module.name} className={s.gridRow}>
                <div className={s.moduleCell}>
                  <span className={s.moduleName}>{module.name}</span>
                  {module.credits != null && (
                    <span className={s.moduleCredits}>
                      {module.credits}학점
                    </span>
                  )}
                  {module.jobs && (
                    <span className={s.moduleMeta}>
                      {module.jobs.join(' · ')}
                    </span>
                  )}
                </div>

                {TERMS.map((term) => (
                  <div
                    key={`${term.year}-${term.semester}`}
                    className={s.termCell}
                  >
                    {cell(module.name, term.year, term.semester).map(
                      (course, index) => (
                        <CourseChip
                          key={`${course.name}-${index}`}
                          course={course}
                          showCredits={!track.creditsUnknown}
                        />
                      ),
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {track.modules.some((m) => m.certificates) && (
          <div className={s.certList}>
            {track.modules
              .filter((m) => m.certificates)
              .map((module) => (
                <div key={module.name} className={s.certRow}>
                  <span className={s.certModule}>{module.name}</span>
                  <span className={s.certItems}>
                    {module.certificates?.join(', ')}
                  </span>
                </div>
              ))}
          </div>
        )}
      </Section>

      {/* ── 교양 ──────────────────────────────────────────────── */}
      <Section
        id="general"
        title="교양"
        note={`총 ${GENERAL_EDUCATION.totalCredits}학점 · ${GENERAL_EDUCATION.areas
          .map((a) => `${a.name} ${a.credits}`)
          .join(' · ')}`}
        datasetUrl={GENERAL_EDUCATION.courseListSource}
        datasetLabel="울산대 교양대학 영역별 교과목 안내"
        baseDate={GENERAL_EDUCATION.baseDate}
      >
        {GENERAL_EDUCATION.areas
          .filter((area) => area.subAreas)
          .map((area) => (
            <div key={area.id} className={s.electiveArea}>
              <div className={s.geHead}>
                <span className={s.tagElective}>{area.requirement}</span>
                <span className={s.geName}>{area.name}</span>
                <span className={s.geCredits}>{area.credits}학점 이상</span>
              </div>
              <p className={s.geRule}>{area.rule}</p>

              <div className={s.subAreas}>
                {area.subAreas?.map((sub) => (
                  <details key={sub.name} className={s.subArea}>
                    <summary className={s.subSummary}>
                      <span className={s.subName}>{sub.name}</span>
                      <span className={s.subCount}>
                        {sub.courses.length}과목
                      </span>
                    </summary>
                    <ul className={s.subCourses}>
                      {sub.courses.map((name) => (
                        <li key={name} className={s.subCourse}>
                          {name}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          ))}
      </Section>

      {/* ── 이수 규정 ─────────────────────────────────────────── */}
      <Section id="rules" title="트랙 이수 규정" note="공통트랙소개">
        <div className={s.ruleGrid}>
          {[TRACK_RULES.base, TRACK_RULES.advanced, TRACK_RULES.integrated].map(
            (rule) => (
              <div key={rule.name} className={s.ruleCard}>
                <span className={s.ruleName}>{rule.name}</span>
                <span className={s.ruleDetail}>{rule.detail}</span>
                <span className={s.ruleDegree}>{rule.degree}</span>
              </div>
            ),
          )}
        </div>
        <ul className={s.ruleNotes}>
          {TRACK_RULES.notes.map((note) => (
            <li key={note} className={s.ruleNote}>
              {note}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

export default CurriculumPage;
