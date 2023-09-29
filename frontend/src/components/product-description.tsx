import { Product } from '../types/product';

type ProductDescriptionProps = {
  product: Product | null;
}

function ProductDescription(props: ProductDescriptionProps): JSX.Element {
  return (
    <p
      className="tabs__product-description"
    >{props.product?.description}
    </p>
  );
}

export default ProductDescription;
