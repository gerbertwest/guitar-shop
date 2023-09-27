import { Helmet } from 'react-helmet-async';
import Footer from '../components/footer';
import Logo from '../components/logo';
import UserName from '../components/user-name';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import { productSelector } from '../store/selectors';
import { fetchProductByIdAction } from '../store/api-actions';

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
                  <li className="main-nav__item"><a className="link main-nav__link" href="main">Каталог</a>
                  </li>
                  <li className="main-nav__item"><a className="link main-nav__link" href="#">Список товаров</a>
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
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
              </li>
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Товар</a>
              </li>
            </ul>
            <div className="product-container">
              <img className="product-container__img" src={productInfo.data?.productImage} srcSet="img/content/catalog-product-1@2x.png 2x" width="90" height="235" alt=""></img>
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">{productInfo.data?.title}</h2>
                <br></br>
                <br></br>
                <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
                  <div className="tabs__content" id="characteristics">
                    <table className="tabs__table">
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{productInfo.data?.code}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">{productInfo.data?.type}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">6 струнная</td>
                      </tr>
                    </table>
                    <p className="tabs__product-description hidden">Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.</p>
                  </div>
                </div>
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

