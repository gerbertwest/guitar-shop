import { Helmet } from 'react-helmet-async';
import Footer from '../components/footer';
import Logo from '../components/logo';
import UserName from '../components/user-name';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../hooks/index';
import { addProductAction } from '../store/api-actions';
import dayjs from 'dayjs';
import { AppRoute } from '../const';
import { AddProduct } from '../types/product';
import { Link, useNavigate } from 'react-router-dom';
import GuitarType from '../components/guitar-type';
import StringsCount from '../components/strings-count';

function AddProductScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [addProductData, setData] = useState({
    title: '',
    description: '',
    type: '',
    sku: '',
    string: Number,
    price: 100,
  });

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setData({...addProductData, [target.name]: target.value});
  };

  const [image, setImage] = useState<File | undefined>();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData: AddProduct = {
      title: addProductData.title,
      description: addProductData.description,
      type: addProductData.type,
      code: addProductData.sku,
      stringsCount: Number(addProductData.string),
      price: Number(addProductData.price),
      productImage: image
    };

    dispatch(addProductAction(formData));
  };
  const handleImageUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (!evt.target.files) {
      return;
    }
    setImage(evt.target.files[0]);
  };

  return (
    <>
      <Helmet>
        <title>Добавление товара - Guitar-Shop</title>
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
                    <Link className="link main-nav__link" to={AppRoute.Products}>Список товаров</Link>
                  </li>
                </ul>
              </nav>
              <UserName/>
            </div>
          </div>
        </header>
        <main className="page-content">
          <section className="add-item">
            <div className="container">
              <h1 className="add-item__title">Новый товар</h1>
              <ul className="breadcrumbs">
                <li className="breadcrumbs__item">
                  <Link className="link" to={AppRoute.Main}>Вход</Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="link" to={AppRoute.Products}>Товары</Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="link" to=''>Новый товар</Link>
                </li>
              </ul>
              <form className="add-item__form" action="#" method="get" onSubmit={handleSubmit}>
                <div className="add-item__form-left">
                  <div className="edit-item-image add-item__form-image">
                    <div className="edit-item-image__image-wrap">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Product preview"
                        />
                      ) : (
                        'Upload image'
                      )}
                    </div>
                    <div className="edit-item-image__btn-wrap">
                      <button
                        className="button button--small button--black-border edit-item-image__btn"
                        type='button'
                      >
                        <label htmlFor="image">Добавить</label>
                      </button>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/png, image/jpeg"
                        hidden
                        onChange={handleImageUpload}
                      >
                      </input>
                      <button className="button button--small button--black-border edit-item-image__btn" onClick={() => setImage(undefined)}>Удалить</button>
                    </div>
                  </div>
                  <GuitarType onChange={onChange}/>
                  <StringsCount onChange={onChange}/>
                </div>
                <div className="add-item__form-right">
                  <div className="custom-input add-item__form-input">
                    <label><span>Дата добавления товара</span>
                      <input type="text" name="date" value={dayjs().format('DD.MM.YYYY').toString()} placeholder="Дата в формате 00.00.0000" readOnly></input>
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-input add-item__form-input">
                    <label><span>Введите наименование товара</span>
                      <input type="text" name="title" value={addProductData.title} placeholder="Наименование" onChange={onChange}></input>
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
                    <label><span>Введите цену товара</span>
                      <input type="text" name="price" value={Number(addProductData.price)} placeholder="Цена в формате 00 000" onChange={onChange}></input>
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-input add-item__form-input">
                    <label><span>Введите артикул товара</span>
                      <input type="text" name="sku" value={addProductData.sku} placeholder="Артикул товара" onChange={onChange}></input>
                    </label>
                    <p>Заполните поле</p>
                  </div>
                  <div className="custom-textarea add-item__form-textarea">
                    <label><span>Введите описание товара</span>
                      <textarea name="description" placeholder="" onChange={onChange}></textarea>
                    </label>
                    <p>Заполните поле</p>
                  </div>
                </div>
                <div className="add-item__form-buttons-wrap">
                  <button className="button button--small add-item__form-button" type="submit">Сохранить изменения</button>
                  <button className="button button--small add-item__form-button" type="button" onClick={() => navigate(AppRoute.Products)}>Вернуться к списку товаров</button>
                </div>
              </form>
            </div>
          </section>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default AddProductScreen;
