import {createReducer} from '@reduxjs/toolkit';
import {loadProductById, loadProducts, requireAuthorization} from './action';
import {AuthorizationStatus} from '../const';
import { Store } from '../types/store';

const initialState: Store = {
  productsList: {
    data: [],
    isLoading: false,
  },
  authorizationStatus: AuthorizationStatus.Unknown,
  product: {
    data: null,
    isError: false,
    isLoading: false,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadProducts, (state, action) => {
      state.productsList.data = action.payload.data ?? [];
      state.productsList.isLoading = action.payload.isLoading ?? false;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadProductById, (state, action) => {
      state.product.data = action.payload.data ?? null;
      state.product.isError = action.payload.isError ?? false;
      state.product.isLoading = action.payload.isLoading ?? false;
    });
});

export {reducer};
