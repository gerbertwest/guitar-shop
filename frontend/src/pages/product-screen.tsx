import { Helmet } from 'react-helmet-async';
import Footer from '../components/footer';
import Logo from '../components/logo';
import UserName from '../components/user-name';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import { productSelector } from '../store/selectors';
import { fetchProductByIdAction } from '../store/api-actions';
import ProductTabs from '../components/product-tabs';
import { AppRoute } from '../const';

function ProductScreen(): JSX.Element {

  const params = useParams();
  const dispatch = useAppDispatch();
  const productInfo = useAppSelector(productSelector);

  useEffect(() => {
    if (!productInfo.isError) {
      dispatch(fetchProductByIdAction(String(params.id)));
    }
  }, [dispatch, productInfo.isError, params.id]);

  return (
    <>
      <Helmet>
        <title>Товар - Guitar-Shop</title>
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
          <div className="container">
            <h1 className="page-content__title title title--bigger">Товар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Main}>Главная</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Products}>Каталог</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to=''>Товар</Link>
              </li>
            </ul>
            <div className="product-container">
              <img className="product-container__img" src={productInfo.data?.productImage} width="90" height="235" alt=""></img>
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">{productInfo.data?.title}</h2>
                <br></br>
                <br></br>
                <ProductTabs product={productInfo.data}/>
              </div>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default ProductScreen;

