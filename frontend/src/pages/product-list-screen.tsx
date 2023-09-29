import { Helmet } from 'react-helmet-async';
import Footer from '../components/footer';
import Logo from '../components/logo';
import UserName from '../components/user-name';
import CatalogFilter from '../components/catalog-filter';
import CatalogSort from '../components/catalog-sort';
import CatalogCards from '../components/catalog-cards';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import { productsListSelector } from '../store/selectors';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../const';
import { useEffect } from 'react';
import { fetchProductsAction } from '../store/api-actions';

function ProductListScreen(): JSX.Element {

  const products = useAppSelector(productsListSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Просмотр товаров - Guitar-Shop</title>
      </Helmet>
      <div className="wrapper">
        <header className="header--admin header" id="header">
          <div className="container">
            <div className="header__wrapper">
              <Logo/>
              <nav className="main-nav">
                <ul className="main-nav__list">
                  <li className="main-nav__item">
                    <Link className="link main-nav__link" to={AppRoute.Products}>Каталог</Link>
                  </li>
                  <li className="main-nav__item">
                    <Link className="link main-nav__link" to=''>Список товаров</Link>
                  </li>
                </ul>
              </nav>
              <UserName/>
            </div>
          </div>
        </header>
        <main className="page-content">
          <section className="product-list">
            <div className="container">
              <h1 className="product-list__title">Список товаров</h1>
              <ul className="breadcrumbs">
                <li className="breadcrumbs__item">
                  <Link className="link" to={AppRoute.Main}>Вход</Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="link" to=''>Товары</Link>
                </li>
              </ul>
              <div className="catalog">
                <CatalogFilter/>
                <CatalogSort/>
                <CatalogCards products={products.data}/>
              </div>
              <button className="button product-list__button button--red button--big"
                onClick={() => navigate(AppRoute.NewProduct)}
              >Добавить новый товар
              </button>
              <div className="pagination product-list__pagination">
                <ul className="pagination__list">
                  <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
                  </li>
                  <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
                  </li>
                  <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
                  </li>
                  <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default ProductListScreen;
