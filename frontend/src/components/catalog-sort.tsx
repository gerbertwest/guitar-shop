import { MouseEventHandler } from 'react';
import cn from 'classnames';
import { Sort } from '../const';

type SortPriceButtonProps = {
  onSortPriceButtonClick: MouseEventHandler<HTMLButtonElement>;
  onDatePriceButtonClick: MouseEventHandler<HTMLButtonElement>;
  onSortTypeUpButtonClick: MouseEventHandler<HTMLButtonElement>;
  onSortTypeDownButtonClick: MouseEventHandler<HTMLButtonElement>;
  sort: string;
  sortType: string;
}


function CatalogSort(props: SortPriceButtonProps): JSX.Element {

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={cn('catalog-sort__type-button', {'catalog-sort__type-button catalog-sort__type-button--active' : props.sort === Sort.Date})} aria-label="по цене"
          onClick={props.onDatePriceButtonClick}
        >
          по дате
        </button>
        <button className={cn('catalog-sort__type-button', {'catalog-sort__type-button catalog-sort__type-button--active' : props.sort === Sort.Price})} aria-label="по цене"
          onClick={props.onSortPriceButtonClick}
        >
          по цене
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={cn('catalog-sort__order-button catalog-sort__order-button--up',
            {'catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active ' : props.sortType === Sort.Up})}
          aria-label="По возрастанию"
          onClick={props.onSortTypeUpButtonClick}
        >
        </button>
        <button
          className={cn('catalog-sort__order-button catalog-sort__order-button--down',
            {'catalog-sort__order-button catalog-sort__order-button--down catalog-sort__order-button--active' : props.sortType === Sort.Down})}
          aria-label="По убыванию"
          onClick={props.onSortTypeDownButtonClick}
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSort;
