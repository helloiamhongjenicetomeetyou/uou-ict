import { useState, type FormEvent } from 'react';
import { hasDataGoKey } from '@/api';
import { Chip, QueryState, Section, Toolbar } from '@/components/common';
import { FIELD_KEYWORDS, useResearchSearch } from '@/services/research';
import { EMPTY_MARK, formatNumber } from '@/utils';
import * as s from './style.css';

const ResearchPage = () => {
  const [draft, setDraft] = useState('');
  const [keyword, setKeyword] = useState('');

  /** 한 번에 10건. 20건을 부르면 초록까지 실려 와 응답이 눈에 띄게 느려진다. */
  const search = useResearchSearch({ keyword, size: 10 });
  const articles = search.data?.articles ?? [];
  const keyReady = hasDataGoKey();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setKeyword(draft.trim());
  };

  const pick = (value: string) => {
    setDraft(value);
    setKeyword(value);
  };

  return (
    <div className={s.page}>
      <Toolbar>
        <form className={s.searchForm} onSubmit={submit}>
          <input
            className={s.searchInput}
            type="search"
            value={draft}
            placeholder="논문 제목"
            aria-label="논문 제목 검색어"
            disabled={!keyReady}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button className={s.searchButton} type="submit" disabled={!keyReady}>
            검색
          </button>
        </form>
        <span className={s.scope}>KCI 논문 제목 검색</span>
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
            <code className={s.code}>VITE_DATAGO_SERVICE_KEY</code> 에 키를
            넣으면 검색이 열립니다. 개발계정은 자동승인입니다.
          </p>
          <p className={s.guideMuted}>
            키가 없을 때 가짜 논문 목록을 보여주지 않습니다. 없는 건 없다고
            표시하는 편이 낫습니다.
          </p>
        </Section>
      ) : !keyword ? (
        <Section title="논문 제목으로 찾습니다" note="추천 검색어">
          <p className={s.guide}>
            이 서비스가 받는 검색 조건은 <b>논문명 하나뿐</b>입니다. 저자명이나
            발행연도로는 찾을 수 없습니다.
          </p>
          <p className={s.guideMuted}>
            KCI 가 논문에 붙여 둔 기관은 저자 소속이 아니라 <b>학술지 발행기관</b>
            이라, &lsquo;울산대 교수 논문&rsquo;만 골라내는 건 이 API 로는 되지
            않습니다. 그래서 걸러내는 척하지 않고 제목 검색으로 둡니다.
          </p>
          <div className={s.suggestions}>
            {FIELD_KEYWORDS.map((item) => (
              <Chip key={item} onClick={() => pick(item)}>
                {item}
              </Chip>
            ))}
          </div>
        </Section>
      ) : (
        <Section
          title="검색 결과"
          note={`"${keyword}" · 전체 ${formatNumber(search.data?.totalCount)}건 중 ${articles.length}건`}
          datasetId="15085348"
          datasetUrl="https://www.data.go.kr/data/15085348/openapi.do"
          datasetLabel="한국연구재단 KCI 논문정보서비스"
        >
          {/* 재시도 사이 빈 틈에 "결과 없음"이 번쩍이지 않게 isFetching 을 본다. */}
          <QueryState
            isLoading={search.isFetching}
            error={search.error}
            isEmpty={!search.isFetching && articles.length === 0}
            emptyMessage="검색 결과가 없습니다. 제목의 일부만 넣어 보세요."
          />

          {search.isFetching && (
            <p className={s.guideMuted}>
              공공데이터포털 응답이 느립니다. 검색어에 따라 수십 초까지 걸립니다.
            </p>
          )}

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
                    {article.keywords.length > 0
                      ? article.keywords.join(' · ')
                      : EMPTY_MARK}
                    {article.pages && ` · ${article.pages}쪽`}
                    {article.doi && ` · DOI ${article.doi}`}
                  </p>
                </div>

                <div className={s.articleSide}>
                  {article.fullText && (
                    <span className={s.openAccess}>원문 있음</span>
                  )}
                  {article.citationCount != null && (
                    <span className={s.citation}>
                      피인용 {formatNumber(article.citationCount)}
                    </span>
                  )}
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
