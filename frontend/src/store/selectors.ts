import { Store } from '../types/store';

export const productsListSelector = (state: Store) => state.productsList;
export const productSelector = (state: Store) => state.product;

