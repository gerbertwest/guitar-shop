import { Helmet } from 'react-helmet-async';
import Footer from '../components/footer';
import Logo from '../components/logo';
import UserName from '../components/user-name';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../const';

function ErrorScreen(): JSX.Element {

  const navigate = useNavigate();

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
            <section className="error">
              <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
              <p className="error__text"> Возможно, страница была удалена или <br></br> её вовсе не существовало.</p>
              <button className="button button__error button--small button--black-border" onClick={() => navigate(AppRoute.Products)}>Продолжить покупки</button>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default ErrorScreen;
