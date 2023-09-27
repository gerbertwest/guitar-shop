import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus} from '../const';
import { Product } from '../types/product';


export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const loadProducts = createAction<{data?: Product[]; isLoading?: boolean}>('data/loadProducts');
export const loadProductById = createAction<{data?: Product | null; isError?: boolean; isLoading?: boolean }>('data/loadProductById');
