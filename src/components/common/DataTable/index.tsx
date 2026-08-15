import type { PropsWithChildren } from 'react';
import * as s from './style.css';

interface Props {
  /** 스크린리더용 표 설명. 시각적으로는 숨긴다. */
  caption: string;
  /** 표가 눌리지 않을 최소 폭. 열이 많으면 키운다. */
  minWidth?: number;
}

/**
 * 공시 표의 공통 껍데기.
 * 좁은 화면에서 페이지 전체가 아니라 표 자신만 가로로 흐르게 한다.
 */
const DataTable = ({
  caption,
  minWidth = 560,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className={s.scroll}>
      <table className={s.table} style={{ minWidth: `${minWidth}px` }}>
        <caption className={s.caption}>{caption}</caption>
        {children}
      </table>
    </div>
  );
};

export default DataTable;
