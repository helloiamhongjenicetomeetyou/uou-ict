import type { PropsWithChildren } from 'react';
import * as s from './style.css';

interface Props {
  /** 스크린리더용. 화면에는 보이지 않는다. */
  caption: string;
  minWidth?: number;
}

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
