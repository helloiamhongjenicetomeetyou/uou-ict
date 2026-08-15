import { useState, type FormEvent } from 'react';
import { hasDataGoKey } from '@/api';
import { QueryState, Section, Toolbar } from '@/components/common';
import { FIELD_KEYWORDS, useResearchSearch } from '@/services/research';
import { SCHOOL } from '@/data';
import { EMPTY_MARK, formatNumber } from '@/utils';
import * as s from './style.css';

const ResearchPage = () => {
  const [draft, setDraft] = useState('');
  const [keyword, setKeyword] = useState('');

  const search = useResearchSearch({ keyword });
  const articles = search.data?.articles ?? [];
  const keyReady = hasDataGoKey();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setKeyword(draft.trim());
  };

  return (
    <div className={s.page}>
      <Toolbar>
        <form className={s.searchForm} onSubmit={handleSubmit}>
          <input
            className={s.searchInput}
            type="search"
            value={draft}
            placeholder="논문 제목·키워드"
            aria-label="논문 검색어"
            disabled={!keyReady}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button className={s.searchButton} type="submit" disabled={!keyReady}>
            검색
          </button>
        </form>
        <span className={s.scope}>소속기관 = {SCHOOL.university}</span>
      </Toolbar>

      {!keyReady ? (
        <Section title="인증키가 필요합니다" note="KCI 논문정보서비스">
          <p className={s.guide}>
            이 화면만 오픈API를 씁니다. 공공데이터포털에서{' '}
            <a
              className={s.inlineLink}
              href="https://www.data.go.kr/data/15085348/openapi.do"
              target="_blank"
              rel="noreferrer"
            >
              KCI 논문정보서비스
            </a>
            를 활용신청한 뒤 <code className={s.code}>.env</code> 의{' '}
            <code className={s.code}>VITE_DATAGO_SERVICE_KEY</code> 에 디코딩된
            키를 넣으면 검색이 열립니다.
          </p>
          <p className={s.guideMuted}>
            키가 없을 때 가짜 논문 목록을 보여주지 않습니다. 없는 건 없다고
            표시하는 편이 낫습니다.
          </p>
          <p className={s.guideMuted}>
            기본 검색어: {FIELD_KEYWORDS.join(', ')}
          </p>
        </Section>
      ) : (
        <Section
          title="관련 논문"
          note={
            keyword
              ? `"${keyword}" · ${formatNumber(search.data?.totalCount)}건`
              : `${FIELD_KEYWORDS.join(', ')} · ${formatNumber(search.data?.totalCount)}건`
          }
          datasetId="15085348"
          datasetUrl="https://www.data.go.kr/data/15085348/openapi.do"
          datasetLabel="KCI 논문정보서비스"
        >
          <QueryState
            isLoading={search.isLoading}
            error={search.error}
            isEmpty={!search.isLoading && articles.length === 0}
            emptyMessage="검색 결과가 없습니다. 키워드를 바꿔보세요."
          />

          <ul className={s.articleList}>
            {articles.map((article) => (
              <li key={article.articleId} className={s.articleCard}>
                <div className={s.articleMain}>
                  <h3 className={s.articleTitle}>
                    {article.url ? (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        className={s.articleLink}
                      >
                        {article.title}
                      </a>
                    ) : (
                      article.title
                    )}
                  </h3>
                  <p className={s.articleMeta}>
                    {article.authors.length > 0
                      ? article.authors.join(', ')
                      : EMPTY_MARK}
                    {article.journalName && ` · ${article.journalName}`}
                    {article.publishedYear && ` · ${article.publishedYear}`}
                  </p>
                </div>

                <div className={s.articleSide}>
                  {article.openAccess && (
                    <span className={s.openAccess}>오픈액세스</span>
                  )}
                  <span className={s.citation}>
                    피인용 {formatNumber(article.citationCount)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
};

export default ResearchPage;
