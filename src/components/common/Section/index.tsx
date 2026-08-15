import type { PropsWithChildren, ReactNode } from 'react';
import * as s from './style.css';

interface Props {
  title: string;
  /** 짧은 한 줄만. 문단을 넣지 않는다. */
  note?: string;
  /** 제목 우측 (연도 선택 등). */
  action?: ReactNode;
  /** 바로가기 앵커. 스크롤 대상이 되는 섹션에만 준다. */
  id?: string;

  /* 출처 — 공공데이터에서 온 값이면 셋을 함께 넘긴다. */
  datasetId?: string;
  datasetUrl?: string;
  datasetLabel?: string;
  baseDate?: string | null;
}

/**
 * 화면의 기본 블록.
 *
 * 그림자 대신 1px 테두리로 면을 나눈다. 출처는 카드 안에서 배지로 튀지 않고
 * 맨 아래 작은 회색 한 줄로 붙는다 — 늘 있어야 하지만 먼저 읽힐 필요는 없다.
 */
const Section = ({
  title,
  note,
  action,
  id,
  datasetId,
  datasetUrl,
  datasetLabel,
  baseDate,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <section className={s.section} id={id}>
      <header className={s.header}>
        <div className={s.heading}>
          <h2 className={s.title}>{title}</h2>
          {note && <span className={s.note}>{note}</span>}
        </div>
        {action && <div className={s.action}>{action}</div>}
      </header>

      {children}

      {datasetUrl && datasetLabel && (
        <footer className={s.source}>
          <a
            href={datasetUrl}
            target="_blank"
            rel="noreferrer"
            className={s.link}
          >
            {datasetLabel}
          </a>
          {datasetId && (
            <>
              <span aria-hidden>·</span>
              <span>{datasetId}</span>
            </>
          )}
          {baseDate && (
            <>
              <span aria-hidden>·</span>
              <span>기준일 {baseDate}</span>
            </>
          )}
        </footer>
      )}
    </section>
  );
};

export default Section;
