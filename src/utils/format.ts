/** 값이 없을 때 표에 찍는 문자. 0 과 구분하기 위해 반드시 이걸 쓴다. */
export const EMPTY_MARK = '—';

const nf = new Intl.NumberFormat('ko-KR');

export const formatNumber = (value: number | null | undefined): string =>
  value == null || Number.isNaN(value) ? EMPTY_MARK : nf.format(value);

export const formatPercent = (
  value: number | null | undefined,
  digits = 1,
): string =>
  value == null || Number.isNaN(value)
    ? EMPTY_MARK
    : `${value.toFixed(digits)}%`;

/**
 * 금액을 읽기 쉬운 단위로 줄인다.
 * 등록금(백만 단위)과 장학금 총액(십억 단위)이 한 화면에 같이 나오는데,
 * 둘 다 만원으로 찍으면 총액이 "152,500만원" 처럼 읽히지 않는다.
 */
export const formatWon = (value: number | null | undefined): string => {
  if (value == null || Number.isNaN(value)) return EMPTY_MARK;

  const abs = Math.abs(value);
  if (abs >= 100_000_000) return `${(value / 100_000_000).toFixed(1)}억원`;
  if (abs >= 10_000) return `${nf.format(Math.round(value / 10_000))}만원`;
  return `${nf.format(value)}원`;
};

/** ISO 문자열을 'YYYY-MM-DD HH:mm' 로. 조회 시각 표기용. */
export const formatDateTime = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return EMPTY_MARK;

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/** 두 값의 증감. 시계열에서 마지막 두 점을 비교할 때 쓴다. */
export const diff = (
  current: number | null | undefined,
  previous: number | null | undefined,
): number | null =>
  current == null || previous == null ? null : current - previous;
