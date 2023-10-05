import { Helmet } from 'react-helmet-async';
import Footer from '../components/footer';
import Logo from '../components/logo';
import UserName from '../components/user-name';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../hooks/index';
import { registerAction } from '../store/api-actions';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

function RegistrationScreen(): JSX.Element {

  const dispatch = useAppDispatch();

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    name: ''

  });

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setAuthData({...authData, [target.name]: target.value});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (authData !== null) {
      dispatch(registerAction({
        email: authData.email,
        password: authData.password,
        name: authData.name
      }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Регистрация - Guitar-Shop</title>
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
              <h1 className="login__title">Регистрация</h1>
              <form method="post" action="/" onSubmit={handleSubmit}>
                <div className="input-login">
                  <label htmlFor="name">Введите имя</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="off" required
                    onChange={onChange}
                  >
                  </input>
                  <p className="input-login__error">Заполните поле</p>
                </div>
                <div className="input-login">
                  <label htmlFor="email">Введите e-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off" required
                    onChange={onChange}
                  >
                  </input>
                  <p className="input-login__error">Заполните поле</p>
                </div>
                <div className="input-login">
                  <label htmlFor="password">Придумайте пароль</label>
                  <span>
                    <input
                      type="password"
                      placeholder="• • • • • • • • • • • •"
                      id="password"
                      name="password"
                      autoComplete="off" required
                      onChange={onChange}
                    >
                    </input>
                    <button className="input-login__button-eye" type="button">
                      <svg width="14" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-eye"></use>
                      </svg>
                    </button>
                  </span>
                  <p className="input-login__error">Заполните поле</p>
                </div>
                <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
              </form>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default RegistrationScreen;
