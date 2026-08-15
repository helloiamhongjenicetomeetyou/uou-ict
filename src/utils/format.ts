/** 값이 없을 때 찍는 문자. 0 과 구분하려고 반드시 이걸 쓴다. */
export const EMPTY_MARK = '—';

const nf = new Intl.NumberFormat('ko-KR');

export const formatNumber = (value: number | null | undefined): string =>
  value == null || Number.isNaN(value) ? EMPTY_MARK : nf.format(value);

export const formatWon = (value: number | null | undefined): string => {
  if (value == null || Number.isNaN(value)) return EMPTY_MARK;

  const abs = Math.abs(value);
  if (abs >= 100_000_000) return `${(value / 100_000_000).toFixed(1)}억원`;
  if (abs >= 10_000) return `${nf.format(Math.round(value / 10_000))}만원`;
  return `${nf.format(value)}원`;
};
