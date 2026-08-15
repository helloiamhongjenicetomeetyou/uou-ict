import type { ReactNode } from 'react';
import * as s from './style.css';

interface Props {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  /** 눌렀을 때 계열 색을 쓰고 싶을 때 (학부 선택 등). */
  accent?: string;
  title?: string;
}

/**
 * 알약 모양 선택 칩.
 *
 * 이 화면의 거의 모든 선택(내비게이션, 학부, 연도)이 이걸 쓴다.
 * 선택된 것만 흰 배경으로 떠오르고 나머지는 회색 글자로 물러난다 —
 * 테두리를 두르거나 색을 채우면 트랙 위에서 시끄러워진다.
 */
const Chip = ({ children, selected, onClick, accent, title }: Props) => {
  return (
    <button
      type="button"
      className={selected ? s.selected : s.chip}
      onClick={onClick}
      title={title}
      aria-pressed={onClick ? selected : undefined}
      style={selected && accent ? { color: accent } : undefined}
    >
      {children}
    </button>
  );
};

export default Chip;
