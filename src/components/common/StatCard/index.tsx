import CountUp from '../CountUp';
import * as s from './style.css';

interface Props {
  label: string;
  value: string;
  /** 값 아래 한 줄. 분모나 기준연도처럼 값을 해석하는 데 필요한 것만. */
  hint?: string;
  /** 이 지표 하나만 계열 색으로 강조할 때. */
  accent?: string;
  /** 값이 숫자가 아니거나 굴릴 필요가 없을 때 끈다. */
  animate?: boolean;
}

/** 지표 하나. 테두리 없이 옅은 면 위에 얹어 표와 나란히 읽히게 한다. */
const StatCard = ({ label, value, hint, accent, animate = true }: Props) => {
  return (
    <div className={s.card}>
      <span className={s.label}>{label}</span>
      <strong
        className={s.value}
        style={accent ? { color: accent } : undefined}
      >
        {animate ? <CountUp value={value} /> : value}
      </strong>
      {hint && <span className={s.hint}>{hint}</span>}
    </div>
  );
};

export default StatCard;
