import { Helmet } from 'react-helmet-async';
import Footer from '../components/footer';
import Logo from '../components/logo';
import UserName from '../components/user-name';
import { useAppSelector } from '../hooks/index';
import { productsListSelector } from '../store/selectors';

function MainScreen(): JSX.Element {
  const products = useAppSelector(productsListSelector);
  // eslint-disable-next-line no-console
  console.log(products);

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
                  <li className="main-nav__item"><a className="link main-nav__link" href="#">Каталог</a>
                  </li>
                  <li className="main-nav__item"><a className="link main-nav__link" href="#">Где купить?</a>
                  </li>
                  <li className="main-nav__item"><a className="link main-nav__link" href="#">О компании</a>
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
              <p className="login__text">Hовый пользователь? <a className="login__link" href="registration.html">Зарегистрируйтесь</a> прямо сейчас</p>
              <form method="post" action="/">
                <div className="input-login">
                  <label htmlFor="email">Введите e-mail</label>
                  <input type="email" id="email" name="email" autoComplete="off" required></input>
                  <p className="input-login__error">Заполните поле</p>
                </div>
                <div className="input-login">
                  <label htmlFor="passwordLogin">Введите пароль</label>
                  <span>
                    <input type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off" required></input>
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

