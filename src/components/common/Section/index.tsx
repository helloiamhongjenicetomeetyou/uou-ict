import type { PropsWithChildren, ReactNode } from 'react';
import * as s from './style.css';

interface Props {
  title: string;
  note?: string;
  action?: ReactNode;
  /** 바로가기 스크롤 대상이 되는 섹션에만 준다. */
  id?: string;

  datasetId?: string;
  datasetUrl?: string;
  datasetLabel?: string;
  baseDate?: string | null;
}

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
