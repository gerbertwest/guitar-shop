import Footer from '../components/footer';

function EditProductScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <header className="header--admin header" id="header">
        <div className="container">
          <div className="header__wrapper">
            <a className="header__logo logo" href="main.html">
              <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"></img>
            </a>
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item"><a className="link main-nav__link" href="main">Каталог</a>
                </li>
                <li className="main-nav__item"><a className="link main-nav__link" href="#">Список товаров</a>
                </li>
              </ul>
            </nav>
            <div className="header__container">
              <span className="header__user-name">Имя</span>
              <a className="header__link" href="login.html" aria-label="Перейти в личный кабинет">
                <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-account"></use>
                </svg><span className="header__link-text">Вход</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="page-content">
        <section className="edit-item">
          <div className="container">
            <h1 className="edit-item__title">СURT Z30 Plus</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Вход</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Товары</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">СURT Z30 Plus</a>
              </li>
            </ul>
            <form className="edit-item__form" action="#" method="get">
              <div className="edit-item__form-left">
                <div className="edit-item-image edit-item__form-image">
                  <div className="edit-item-image__image-wrap">
                    <img className="edit-item-image__image" src="img/content/add-item-1.png" srcSet="img/content/add-item-1@2x.png 2x" width="133" height="332" alt="СURT Z30 Plus">
                    </img>
                  </div>
                  <div className="edit-item-image__btn-wrap">
                    <button className="button button--small button--black-border edit-item-image__btn">Заменить
                    </button>
                    <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                  </div>
                </div>
                <div className="input-radio edit-item__form-radio"><span>Тип товара</span>
                  <input type="radio" id="guitar" name="item-type" value="guitar"></input>
                  <label htmlFor="guitar">Акустическая гитара</label>
                  <input type="radio" id="el-guitar" name="item-type" value="el-guitar" checked></input>
                  <label htmlFor="el-guitar">Электрогитара</label>
                  <input type="radio" id="ukulele" name="item-type" value="ukulele"></input>
                  <label htmlFor="ukulele">Укулеле</label>
                </div>
                <div className="input-radio edit-item__form-radio"><span>Количество струн</span>
                  <input type="radio" id="string-qty-4" name="string-qty" value="4" checked></input>
                  <label htmlFor="string-qty-4">4</label>
                  <input type="radio" id="string-qty-6" name="string-qty" value="6"></input>
                  <label htmlFor="string-qty-6">6</label>
                  <input type="radio" id="string-qty-7" name="string-qty" value="7"></input>
                  <label htmlFor="string-qty-7">7</label>
                  <input type="radio" id="string-qty-12" name="string-qty" value="12"></input>
                  <label htmlFor="string-qty-12">12</label>
                </div>
              </div>
              <div className="edit-item__form-right">
                <div className="custom-input edit-item__form-input">
                  <label><span>Дата добавления товара</span>
                    <input type="text" name="date" value="19.09.2022" placeholder="Дата в формате 00.00.0000" readOnly></input>
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input edit-item__form-input">
                  <label><span>Наименование товара</span>
                    <input type="text" name="title" value="СURT Z30 Plus" placeholder="Наименование"></input>
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input edit-item__form-input edit-item__form-input--price">
                  <label><span>Цена товара</span>
                    <input type="text" name="price" value="27 000" placeholder="Цена в формате 00 000"></input>
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-input edit-item__form-input">
                  <label><span>Артикул товара</span>
                    <input type="text" name="sku" value="SO757575" placeholder="Артикул товара"></input>
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className="custom-textarea edit-item__form-textarea">
                  <label><span>Описание товара</span>
                    <textarea name="description" placeholder="">Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений.
 Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.
                    </textarea>
                  </label>
                  <p>Заполните поле</p>
                </div>
              </div>
              <div className="edit-item__form-buttons-wrap">
                <button className="button button--small edit-item__form-button" type="submit">Сохранить изменения</button>
                <button className="button button--small edit-item__form-button" type="button">Вернуться к списку товаров</button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default EditProductScreen;
