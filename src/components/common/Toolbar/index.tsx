import type { ReactNode } from 'react';
import * as s from './style.css';

interface Props {
  children: ReactNode;
  trailing?: ReactNode;
  /** 좁은 화면에서는 조작 줄이 본문을 다 덮어서 태블릿 이하에서는 저절로 풀린다. */
  sticky?: boolean;
}

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
