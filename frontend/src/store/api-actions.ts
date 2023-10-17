import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus, HTTP_CODE, REDIRECT_ACTION_NAME} from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { AddProduct, EditProduct, Product } from '../types/product';
import { addProduct, loadProductById, loadProducts, requireAuthorization } from './action';
import { NewUser } from '../types/new-user';

const redirectToRoute = createAction<string>(REDIRECT_ACTION_NAME);

export const fetchProductsAction = createAsyncThunk<void, {
  sortDirection?: string;
  filter?: string;
  sort?: string;
  page?: string;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async ({sortDirection, filter, sort, page}, {dispatch, extra: api}) => {
    dispatch(loadProducts({isLoading: true}));
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const {data} = await api.get<Product[]>(`${APIRoute.Products}?${page}&${sortDirection}&${sort}&${filter}`);
    dispatch(loadProducts({isLoading: false}));
    dispatch(loadProducts({data}));
  },
);

// export const filterByTypeAction = createAsyncThunk<void, string, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'data/filterByType',
//   async (filter, {dispatch, extra: api}) => {
//     dispatch(loadProducts({isLoading: true}));
//     const {data} = await api.get<Product[]>(`${APIRoute.Products}?${filter}`);
//     dispatch(loadProducts({isLoading: false}));
//     dispatch(loadProducts({data}));
//   },
// );

// export const sortProductsByPriceAction = createAsyncThunk<void, string[], {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'data/sortProductsByPrice',
//   async ([sortDirection, filter], {dispatch, extra: api}) => {
//     dispatch(loadProducts({isLoading: true}));
//     const {data} = await api.get<Product[]>(`${APIRoute.Products}?sortType=${sortDirection}&sort=price&${filter}`);
//     dispatch(loadProducts({isLoading: false}));
//     dispatch(loadProducts({data}));
//   },
// );

export const fetchProductByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProductById',
  async (productId, {dispatch, extra: api}) => {
    try {
      dispatch(loadProductById({isError: false}));
      dispatch(loadProductById({isLoading: true}));
      const {data} = await api.get<Product>(`${APIRoute.Products}/${productId}`);
      dispatch(loadProductById({isLoading: false}));
      dispatch(loadProductById({data}));
    } catch {
      dispatch(loadProductById({isError: true}));
    }
  },
);

export const addProductAction = createAsyncThunk<void, AddProduct, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/AddProduct',
  async ({title, description, type, code, stringsCount, price, productImage}, {dispatch, extra: api}) => {
    dispatch(addProduct({isSending: true}));
    const postData = await api.post<{ id: string }>(AppRoute.Products, {
      title,
      description,
      type,
      code,
      stringsCount,
      price,
    });

    if (postData.status === HTTP_CODE.CREATED && productImage) {
      const payload = new FormData();
      payload.append('productImage', productImage);
      await api.post(`${AppRoute.Products}/${postData.data.id}/image`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      dispatch(addProduct({isSending: false}));
      dispatch(redirectToRoute(AppRoute.Products));
    }
  },
);

export const editProductAction = createAsyncThunk<void, EditProduct, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/EditProduct',
  async ({title, description, type, code, stringsCount, price, productImage, id}, {dispatch, extra: api}) => {
    if (id) {
      const postData = await api.patch(`${AppRoute.Products}/${id}`, {
        title,
        description,
        type,
        code,
        stringsCount,
        price,
      });

      if (postData.status === HTTP_CODE.OK && productImage) {
        const payload = new FormData();
        payload.append('productImage', productImage);
        await api.post(`${AppRoute.Products}/${id}/image`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
    }
    dispatch(redirectToRoute(AppRoute.Products));
  },
);

export const deleteProductByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/deleteProductById',
  async (productId, {dispatch, extra: api}) => {
    try {
      dispatch(loadProductById({isError: false}));
      dispatch(loadProductById({isLoading: true}));
      await api.delete<Product>(`${APIRoute.Products}/${productId}`);
      dispatch(loadProductById({isLoading: false}));
      const {data} = await api.get<Product[]>(APIRoute.Products);
      dispatch(loadProducts({isLoading: false}));
      dispatch(loadProducts({data}));
    } catch {
      dispatch(loadProductById({isError: true}));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Products));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
}>(
  'user/logout',
  (_arg, {dispatch}) => {
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const registerAction = createAsyncThunk<void, NewUser, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async ({ email, password, name }, {dispatch, extra: api}) => {
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    await api.post<{ id: string }>(APIRoute.Register, {email, password, name});
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

