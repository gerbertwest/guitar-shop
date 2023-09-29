import { ChangeEventHandler, Fragment } from 'react';
import { GUITAR_TYPES } from '../const';

type GuitarTypeProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
}

function GuitarType(props: GuitarTypeProps): JSX.Element {
  return (
    <div className="input-radio add-item__form-radio"><span>Выберите тип товара</span>
      {GUITAR_TYPES.map((guitarType) => (
        guitarType === props.type ?
          <Fragment key={guitarType}>
            <input type="radio" id={guitarType} name="type" value={guitarType} onChange={props.onChange} checked></input>
            <label htmlFor={guitarType}>{guitarType}</label>
          </Fragment>
          :
          <Fragment key={guitarType}>
            <input type="radio" id={guitarType} name="type" value={guitarType} onChange={props.onChange}></input>
            <label htmlFor={guitarType}>{guitarType}</label>
          </Fragment>
      ))}
    </div>
  );
}

export default GuitarType;

