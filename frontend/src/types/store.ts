import { AuthorizationStatus } from '../const.js';
import { Product } from './product.js';

export type Store = {
  productsList: {
    data: Product[];
    isLoading: boolean;
  };
  product: {
    data: Product | null;
    isError: boolean;
    isLoading: boolean;
  };
  authorizationStatus: AuthorizationStatus;
};
