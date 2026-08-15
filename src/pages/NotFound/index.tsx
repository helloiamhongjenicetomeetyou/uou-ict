import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import * as s from './style.css';

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <span className={s.code}>404</span>
      <p className={s.message}>페이지를 찾을 수 없습니다.</p>
      <Link to={ROUTES.HOME} className={s.link}>
        개요로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
