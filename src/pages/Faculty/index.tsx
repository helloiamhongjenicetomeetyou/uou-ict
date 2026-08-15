import { useMemo, useState } from 'react';
import {
  Chip,
  CountUp,
  Section,
  Toolbar,
  ToolbarGroup,
} from '@/components/common';
import { FACULTY, RANK_LABEL } from '@/data';
import { useMediaQuery } from '@/hooks';
import { screen } from '@/styles';
import type { FacultyRank } from '@/types';
import * as s from './style.css';

type RankFilter = FacultyRank | 'ALL';

const RANK_ORDER: FacultyRank[] = ['PROFESSOR', 'ASSOCIATE', 'ASSISTANT'];

const PHONE_QUERY = `(max-width: ${screen.phone})`;

const FacultyPage = () => {
  const [rank, setRank] = useState<RankFilter>('ALL');
  const [keyword, setKeyword] = useState('');

  const counts = useMemo(() => {
    const map = new Map<FacultyRank, number>();
    for (const member of FACULTY) {
      map.set(member.rank, (map.get(member.rank) ?? 0) + 1);
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return FACULTY.filter((member) => {
      if (rank !== 'ALL' && member.rank !== rank) return false;
      if (!q) return true;
      return (
        member.name.toLowerCase().includes(q) ||
        member.fields.some((field) => field.toLowerCase().includes(q))
      );
    });
  }, [rank, keyword]);

  /* 폰에서는 결과 수를 따로 한 줄 잡지 않고 검색창 옆에 붙인다. */
  const narrow = useMediaQuery(PHONE_QUERY);

  const count = (
    <span className={s.count}>
      <CountUp value={`${filtered.length}명`} duration={420} />
    </span>
  );

  return (
    <div className={s.page}>
      <Toolbar trailing={narrow ? undefined : count}>
        <ToolbarGroup label="직위">
          <Chip selected={rank === 'ALL'} onClick={() => setRank('ALL')}>
            전체 {FACULTY.length}
          </Chip>
          {RANK_ORDER.map((option) => (
            <Chip
              key={option}
              selected={rank === option}
              onClick={() => setRank(option)}
            >
              {RANK_LABEL[option]} {counts.get(option) ?? 0}
            </Chip>
          ))}
        </ToolbarGroup>

        <div className={s.searchRow}>
          <input
            className={s.search}
            type="search"
            value={keyword}
            placeholder="이름·연구분야"
            aria-label="교수 검색"
            onChange={(event) => setKeyword(event.target.value)}
          />
          {narrow && count}
        </div>
      </Toolbar>

      <Section
        title="교수진"
        note="교수·부교수·조교수 · 산학협력중점교원·연구·초빙교수 제외"
        action={
          <a
            className={s.sourceLink}
            href="https://ict.ulsan.ac.kr/ict/6629"
            target="_blank"
            rel="noreferrer"
          >
            원본 ↗
          </a>
        }
      >
        {filtered.length === 0 ? (
          <p className={s.empty}>검색 결과가 없습니다.</p>
        ) : (
          <ul className={s.list}>
            {filtered.map((member) => (
              <li key={member.name} className={s.row}>
                <div className={s.identity}>
                  <span className={s.name}>{member.name}</span>
                  <span className={s.rank}>{RANK_LABEL[member.rank]}</span>
                </div>

                <ul className={s.fields}>
                  {member.note && <li className={s.note}>{member.note}</li>}
                  {member.fields.length > 0 ? (
                    member.fields.map((field) => (
                      <li key={field} className={s.field}>
                        {field}
                      </li>
                    ))
                  ) : (
                    <li className={s.fieldEmpty}>연구분야 미공개</li>
                  )}
                </ul>

                <div className={s.contact}>
                  {member.tel && <span>{member.tel}</span>}
                  {member.email && (
                    <a className={s.mail} href={`mailto:${member.email}`}>
                      {member.email}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
};

export default FacultyPage;
