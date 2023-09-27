import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { useAppDispatch } from '../hooks/index';
import { logoutAction } from '../store/api-actions';

function UserName(): JSX.Element {

  const dispatch = useAppDispatch();

  return (
    <div className="header__container">
      <span className="header__user-name">Имя</span>
      <Link className="header__link"
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(logoutAction());
        }}
        to={AppRoute.Main} aria-label="Перейти в личный кабинет"
      >
        <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
          <use xlinkHref="#icon-account"></use>
        </svg>
        <span className="header__link-text">Вход</span>
      </Link>
    </div>
  );
}

export default UserName;
