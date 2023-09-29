import { Helmet } from 'react-helmet-async';
import Footer from '../components/footer';
import Logo from '../components/logo';
import UserName from '../components/user-name';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../hooks/index';
import { loginAction } from '../store/api-actions';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

function MainScreen(): JSX.Element {

  const dispatch = useAppDispatch();

  const [authData, setAuthData] = useState({
    login: '',
    password: '',
  });

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setAuthData({...authData, [target.name]: target.value});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (authData !== null) {
      dispatch(loginAction({
        login: authData.login,
        password: authData.password,
      }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Авторизация - Guitar-Shop</title>
      </Helmet>
      <div className="wrapper">
        <header className="header" id="header">
          <div className="container">
            <div className="header__wrapper">
              <Logo/>
              <nav className="main-nav">
                <ul className="main-nav__list">
                  <li className="main-nav__item">
                    <Link className="link main-nav__link" to={AppRoute.Products}>Каталог</Link>
                  </li>
                  <li className="main-nav__item">
                    <Link className="link main-nav__link" to=''>Где купить?</Link>
                  </li>
                  <li className="main-nav__item">
                    <Link className="link main-nav__link" to=''>О компании</Link>
                  </li>
                </ul>
              </nav>
              <UserName/>
            </div>
          </div>
        </header>
        <main className="page-content">
          <div className="container">
            <section className="login">
              <h1 className="login__title">Войти</h1>
              <p className="login__text">Hовый пользователь?
                <Link className="login__link" to={AppRoute.Registration}>Зарегистрируйтесь</Link>
                прямо сейчас
              </p>
              <form method="post" action="/" onSubmit={handleSubmit}>
                <div className="input-login">
                  <label htmlFor="email">Введите e-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="login"
                    autoComplete="off" required
                    onChange={onChange}
                  />
                  <p className="input-login__error">Заполните поле</p>
                </div>
                <div className="input-login">
                  <label htmlFor="passwordLogin">Введите пароль</label>
                  <span>
                    <input
                      type="password"
                      placeholder="• • • • • • • • • • • •"
                      id="passwordLogin"
                      name="password" autoComplete="off" required
                      onChange={onChange}
                    />
                    <button className="input-login__button-eye" type="button">
                      <svg width="14" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-eye"></use>
                      </svg>
                    </button>
                  </span>
                  <p className="input-login__error">Заполните поле</p>
                </div>
                <button className="button login__button button--medium" type="submit">Войти</button>
              </form>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default MainScreen;

