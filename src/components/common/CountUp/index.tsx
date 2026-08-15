import { useCountUp } from '@/hooks';

/** 문자열 안의 첫 숫자. 자릿수 쉼표와 소수점까지 한 덩어리로 잡는다. */
const NUMBER = /-?\d[\d,]*(?:\.\d+)?/;

interface Props {
  /** '29학점', '797만원' 처럼 단위가 붙은 완성된 문자열 그대로 넘긴다. */
  value: string;
  duration?: number;
}

/**
 * 문자열 안의 첫 숫자만 굴리는 표시용 컴포넌트.
 *
 * 숫자와 단위를 따로 받지 않는 건 화면이 이미 `formatWon` 같은 표기 함수를 거친
 * 완성된 문자열을 들고 있기 때문이다. 숫자가 없으면(`—` 등) 그대로 찍는다.
 * 굴러가는 동안 폭이 흔들리지 않도록 쓰는 쪽에서 고정폭 숫자 글꼴을 쓴다.
 */
const CountUp = ({ value, duration }: Props) => {
  const match = value.match(NUMBER);
  const target = match ? Number(match[0].replace(/,/g, '')) : 0;
  const current = useCountUp(target, duration);

  if (!match) return <>{value}</>;

  const decimals = match[0].split('.')[1]?.length ?? 0;
  const rounded = Number(current.toFixed(decimals));
  const text = match[0].includes(',')
    ? rounded.toLocaleString('ko-KR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : rounded.toFixed(decimals);

  const start = match.index ?? 0;

  return (
    <>
      {value.slice(0, start)}
      {text}
      {value.slice(start + match[0].length)}
    </>
  );
};

export default CountUp;
