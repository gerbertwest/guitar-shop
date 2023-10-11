import { ChangeEventHandler, MouseEventHandler } from 'react';
import { GUITAR_TYPES, STRINGS_COUNT } from '../const';


type FilterProps = {
  onChangeType: ChangeEventHandler<HTMLInputElement>;
  onChangeStrings: ChangeEventHandler<HTMLInputElement>;
  onFilterReset: MouseEventHandler<HTMLButtonElement>;
}

function CatalogFilter(props: FilterProps): JSX.Element {

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" value={GUITAR_TYPES[1]} onChange={props.onChangeType}></input>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric" value={GUITAR_TYPES[0]} onChange={props.onChangeType}></input>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" value={GUITAR_TYPES[2]} onChange={props.onChangeType}></input>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" value={STRINGS_COUNT[0]} onChange={props.onChangeStrings}></input>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" value={STRINGS_COUNT[1]} onChange={props.onChangeStrings}></input>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings" value={STRINGS_COUNT[2]} onChange={props.onChangeStrings}></input>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" value={STRINGS_COUNT[3]} onChange={props.onChangeStrings}></input>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset" onClick={props.onFilterReset}>Очистить</button>
    </form>
  );
}

export default CatalogFilter;
