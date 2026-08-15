import type { ReactNode } from 'react';
import * as s from './style.css';

interface Props {
  children: ReactNode;
  /** 오른쪽 끝에 붙는 상태 표시 등. */
  trailing?: ReactNode;
  /**
   * 스크롤을 내려도 헤더 아래에 붙잡아 둘지.
   * 표가 길어 조건을 자주 바꾸는 화면에만 켠다. 좁은 화면에서는 조작 줄이
   * 여러 줄로 접혀 본문을 다 덮으므로 태블릿 이하에서는 저절로 풀린다.
   */
  sticky?: boolean;
}

/**
 * 본문 맨 위에 눕는 조작 줄.
 * 학부·연도 선택처럼 화면 전체에 걸리는 조건은 전부 여기 모은다.
 * 섹션마다 흩어놓으면 지금 무슨 조건으로 보고 있는지 놓친다.
 */
const Toolbar = ({ children, trailing, sticky }: Props) => {
  return (
    <div
      className={sticky ? s.stickyBar : s.bar}
      data-sticky-toolbar={sticky ? '' : undefined}
    >
      <div className={s.controls}>{children}</div>
      {trailing && <div className={s.trailing}>{trailing}</div>}
    </div>
  );
};

/** 조작 줄 안에서 칩 묶음 하나를 감싸는 회색 트랙. */
export const ToolbarGroup = ({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) => (
  <div className={s.group}>
    {label && <span className={s.groupLabel}>{label}</span>}
    <div className={s.track}>{children}</div>
  </div>
);

export default Toolbar;
