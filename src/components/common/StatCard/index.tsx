import CountUp from '../CountUp';
import * as s from './style.css';

interface Props {
  label: string;
  value: string;
  hint?: string;
  accent?: string;
  animate?: boolean;
}

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
