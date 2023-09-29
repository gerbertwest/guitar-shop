import { ChangeEventHandler, Fragment } from 'react';
import { STRINGS_COUNT } from '../const';

type StringsCountProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  stringCount?: number | undefined;
}

function StringsCount(props: StringsCountProps): JSX.Element {

  return (
    <div className="input-radio add-item__form-radio"><span>Количество струн</span>
      {STRINGS_COUNT.map((stringsCount) => (
        stringsCount === props.stringCount ?
          <Fragment key={stringsCount}>
            <input type="radio" id={stringsCount.toString()} name="string" value={stringsCount} onChange={props.onChange} checked></input>
            <label htmlFor={stringsCount.toString()}>{stringsCount}</label>
          </Fragment>
          :
          <Fragment key={stringsCount}>
            <input type="radio" id={stringsCount.toString()} name="string" value={stringsCount} onChange={props.onChange}></input>
            <label htmlFor={stringsCount.toString()}>{stringsCount}</label>
          </Fragment>
      ))}
    </div>
  );
}

export default StringsCount;
