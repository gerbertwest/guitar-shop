import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus} from '../const';
import { Product } from '../types/product';


export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const loadProducts = createAction<{data?: Product[]; isLoading?: boolean}>('data/loadProducts');
export const loadProductById = createAction<{data?: Product; isError?: boolean; isLoading?: boolean }>('data/loadProductById');
export const addProduct = createAction<{isError?: boolean; isSending?: boolean }>('data/addProduct');
export const editProduct = createAction<{data?: Product; isError?: boolean; isLoading?: boolean }>('data/editProduct');
export const deleteProduct = createAction<{data?: Product; isError?: boolean; isLoading?: boolean }>('data/editProduct');


