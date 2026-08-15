import { useEffect, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { NAV_ITEMS, ROUTES } from '@/constants';
import { ScrollTopButton } from '@/components/common';
import * as s from './style.css';

/**
 * 앱 껍데기.
 *
 * 제목·설명은 여기 한 번만 나오고, 각 화면은 곧바로 데이터로 시작한다.
 * 화면마다 큰 제목과 문단을 반복하면 도구가 아니라 소개 페이지처럼 읽힌다.
 */
const RootLayout = () => {
  const headerRef = useRef<HTMLElement>(null);

  /**
   * 헤더 높이를 재서 CSS 변수로 넘긴다.
   * 스티키 조작 줄과 바로가기 스크롤이 이 값을 기준으로 자리를 잡는데,
   * 헤더는 태블릿 이하에서 2줄로 접혀 높이가 달라진다.
   */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const apply = () => {
      const { height } = header.getBoundingClientRect();
      document.documentElement.style.setProperty(
        '--app-header-h',
        `${Math.round(height)}px`,
      );
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={s.wrapper}>
      <header className={s.header} data-app-header ref={headerRef}>
        <div className={s.headerInner}>
          <NavLink to={ROUTES.HOME} className={s.brand}>
            <span className={s.mark} aria-hidden />
            <span>
              <h1 className={s.title}>ICT융합학부 교과과정</h1>
              <p className={s.subtitle}>
                울산대 ICT융합학부 교과과정을 한 눈에 보세요.
              </p>
            </span>
          </NavLink>

          <nav className={s.nav} aria-label="주요 화면">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === ROUTES.HOME}
                className={({ isActive }) =>
                  isActive ? s.navActive : s.navLink
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className={s.main}>
        <Outlet />
      </main>

      <footer className={s.footer}>
        <p>
          울산대 ICT융합학부 · 교양대학 · UWINS 공개 자료와 한국장학재단
          공공데이터. 이용허락범위는 각 제공처 표기를 따릅니다.
        </p>
      </footer>

      <ScrollTopButton />
    </div>
  );
};

export default RootLayout;
