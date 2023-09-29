import { Product } from '../types/product';

type ProductCharacteristicsProps = {
  product: Product | null;
}

function ProductCharacteristics(props: ProductCharacteristicsProps): JSX.Element {
  return (
    <table className="tabs__table">
      <tr className="tabs__table-row">
        <td className="tabs__title">Артикул:</td>
        <td className="tabs__value">{props.product?.code}</td>
      </tr>
      <tr className="tabs__table-row">
        <td className="tabs__title">Тип:</td>
        <td className="tabs__value">{props.product?.type}</td>
      </tr>
      <tr className="tabs__table-row">
        <td className="tabs__title">Количество струн:</td>
        <td className="tabs__value">{props.product?.stringsCount}</td>
      </tr>
    </table>
  );
}

export default ProductCharacteristics;
