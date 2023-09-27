import { Helmet } from 'react-helmet-async';
import Footer from '../components/footer';
import Logo from '../components/logo';
import UserName from '../components/user-name';

function ErrorScreen(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>404 - Guitar-Shop</title>
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
            <section className="error">
              <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
              <p className="error__text"> Возможно, страница была удалена или <br></br> её вовсе не существовало.</p>
              <button className="button button__error button--small button--black-border">Продолжить покупки</button>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default ErrorScreen;
