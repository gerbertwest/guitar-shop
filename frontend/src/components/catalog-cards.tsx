import dayjs from 'dayjs';
import { Product } from '../types/product';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

type CatalogCardsProps = {
  products: Product[];
}

function CatalogCards(props: CatalogCardsProps): JSX.Element {
  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {props.products.map((product) => (
          <li className="catalog-item" key={product.id}>
            <div className="catalog-item__data">
              <img src={product.productImage} srcSet={`${product.productImage}@2x.png 2x`} width="36" height="93" alt={product.title}></img>
              <div className="catalog-item__data-wrapper">
                <Link className="link" to={`${AppRoute.Products}${product.id}`}><p className="catalog-item__data-title">{product.title}</p></Link>
                <br></br>
                <p className="catalog-item__data-date">Дата добавления {dayjs(product.postDate).format('DD.MM.YYYY').toString()}</p>
                <p className="catalog-item__data-price">{product.price} ₽</p>
              </div>
            </div>
            <div className="catalog-item__buttons">
              <Link className="button button--small button--black-border" to={`${AppRoute.Products}${product.id}/${AppRoute.EditProduct}`} aria-label="Редактировать товар">Редактировать</Link>
              <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CatalogCards;
