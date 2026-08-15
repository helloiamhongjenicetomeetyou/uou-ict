import { getApiErrorMessage } from '@/api';
import * as s from './style.css';

interface Props {
  isLoading: boolean;
  error: unknown;
  /** 성공했지만 보여줄 행이 없을 때. */
  isEmpty?: boolean;
  emptyMessage?: string;
}

/**
 * 로딩·에러·빈 상태를 한 컴포넌트로 묶는다.
 * 세 상태 중 아무것도 아니면 null 을 돌려주므로, 호출부에서 실제 내용과 나란히 둔다.
 */
const QueryState = ({ isLoading, error, isEmpty, emptyMessage }: Props) => {
  if (isLoading) {
    return <p className={s.loading}>불러오는 중…</p>;
  }

  if (error) {
    return (
      <p className={s.error} role="alert">
        {getApiErrorMessage(error)}
      </p>
    );
  }

  if (isEmpty) {
    return (
      <p className={s.empty}>{emptyMessage ?? '해당하는 데이터가 없습니다.'}</p>
    );
  }

  return null;
};

export default QueryState;
