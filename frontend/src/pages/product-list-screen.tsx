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
import { AppRoute, Sort } from '../const';
import { ChangeEvent, useEffect, useState } from 'react';
import { fetchProductsAction } from '../store/api-actions';
//import cn from 'classnames';

function ProductListScreen(): JSX.Element {

  const products = useAppSelector(productsListSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //Сортировка

  const [sort, setSort] = useState(Sort.Date);
  const [sortType, setSortType] = useState(Sort.Down);

  const handlePriceSort = () => {
    setSort(Sort.Price);
  };
  const handleDateSort = () => {
    setSort(Sort.Date);
  };
  const handleSortUp = () => {
    setSortType(Sort.Up);
  };
  const handleSortDown = () => {
    setSortType(Sort.Down);
  };

  //Фильтрация по типу

  const DEFAULT_TYPE: string[] = [];
  const DEFAULT_STRINGS: number[] = [];

  const [filterType, addFilterType] = useState(DEFAULT_TYPE);

  const filtersByType = (value: string) => {
    const ind = filterType.indexOf(value);
    if (ind === -1) {
      addFilterType([...filterType, value]);
    }
    else {
      addFilterType(() => filterType.filter((val) => val !== value));
    }
  };

  const onChangeType = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    filtersByType(target.value);
  };

  //Фильтрация по струнам

  const [filterStrings, addFilterStrings] = useState(DEFAULT_STRINGS);

  const filtersByStrings = (value: number) => {
    const ind = filterStrings.indexOf(value);
    if (ind === -1) {
      addFilterStrings([...filterStrings, value]);
    }
    else {
      addFilterStrings(() => filterStrings.filter((val) => val !== value));
    }
  };

  const onChangeStrings = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    filtersByStrings(Number(target.value));
  };

  const handleFilterReset = () => {
    addFilterStrings([]);
    addFilterType([]);
  };


  // Пагинация

  //console.log(products.data.length);

  const [pageNumber, setPageNumber] = useState(1);


  useEffect(() => {
    const sorting = `sort=${sort}`;
    const sortDirection = `sortType=${sortType}`;
    const page = `page=${pageNumber}`;
    if (filterType.length === 0 && filterStrings.length === 0) {
      dispatch(fetchProductsAction({sortDirection: sortDirection, sort: sorting, page:page}));
    }
    if (filterType.length === 0) {
      const filter = `stringsCount=${filterStrings.join('&stringsCount=')}`;
      dispatch(fetchProductsAction({sortDirection: sortDirection, sort: sorting, filter: filter, page:page}));
    }
    if(filterStrings.length === 0) {
      const filter = `type=${filterType.join('&type=')}`;
      dispatch(fetchProductsAction({sortDirection: sortDirection, sort: sorting, filter: filter, page:page}));
    }
    else {
      const filter = `type=${filterType.join('&type=')}&stringsCount=${filterStrings.join('&stringsCount=')}`;
      dispatch(fetchProductsAction({sortDirection: sortDirection, sort: sorting, filter: filter, page:page}));
    }

  }, [dispatch, filterStrings, filterType, pageNumber, sort, sortType]);

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
                <CatalogFilter
                  onChangeType={onChangeType}
                  onChangeStrings={onChangeStrings}
                  onFilterReset={handleFilterReset}
                />
                <CatalogSort
                  onSortPriceButtonClick={handlePriceSort}
                  onDatePriceButtonClick={handleDateSort}
                  onSortTypeUpButtonClick={handleSortUp}
                  onSortTypeDownButtonClick={handleSortDown}
                  sort={sort}
                  sortType={sortType}
                />
                <CatalogCards products={products.data}/>
              </div>
              <button className="button product-list__button button--red button--big"
                onClick={() => navigate(AppRoute.NewProduct)}
              >Добавить новый товар
              </button>
              <div className="pagination product-list__pagination">
                <ul className="pagination__list">
                  <li className="pagination__page ">
                    <Link className='link pagination__page-link' to='' onClick = {() => setPageNumber(1)}>1</Link >
                  </li>
                  <li className="pagination__page">
                    <Link className="link pagination__page-link" to='' onClick = {() => setPageNumber(2)}>2</Link>
                  </li>
                  <li className="pagination__page">
                    <Link className="link pagination__page-link" to='' onClick = {() => setPageNumber(3)}>3</Link>
                  </li>
                  <li className="pagination__page pagination__page--next" id="next">
                    <Link className="link pagination__page-link" to='' onClick = {() => setPageNumber(pageNumber + 1)}>Далее</Link>
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


//'pagination__page--active'
