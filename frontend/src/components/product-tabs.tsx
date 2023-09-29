import { useState } from 'react';
import { ProductPageState } from '../const';
import ProductCharacteristics from './product-characteristics';
import ProductDescription from './product-description';
import { Product } from '../types/product';
import { Link } from 'react-router-dom';
import cn from 'classnames';

const productPageTabs = Object.values(ProductPageState);

type ProductTabsProps = {
  product: Product | null;
}

function ProductTabs(props: ProductTabsProps): JSX.Element {
  const [tab, setActiveTab] = useState(ProductPageState.Characteristics);
  const renderTab = () => {
    switch (tab) {
      case ProductPageState.Characteristics:
        return <ProductCharacteristics product={props.product}/>;
      case ProductPageState.Description:
        return <ProductDescription product={props.product}/>;
    }
  };

  return (
    <div className="tabs">
      {productPageTabs.map((productPageTab) => (
        <Link
          className={cn('button button--black-border button--medium tabs__button', {'button button--medium tabs__button' : tab === productPageTab})}
          key={productPageTab}
          to=''
          onClick={() => setActiveTab(productPageTab)}
        >
          {productPageTab}
        </Link>

      ))}
      <div className="tabs__content" id={tab === 'Описание' ? 'characteristics' : 'description'}>
        {renderTab()}
      </div>
    </div>

  );
}

export default ProductTabs;

