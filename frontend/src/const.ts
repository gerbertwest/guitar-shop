export enum AppRoute {
  Registration = '/register',
  Products = '/products',
  Main = '/',
  NewProduct = '/create',
  EditProduct = 'edit',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Products = '/products',
  Login = 'users/login',
  Logout = 'users/logout',
  Register = '/users/register',
}

export const REDIRECT_ACTION_NAME = 'main/redirectToRoute';

export const GUITAR_TYPES = [
  'Электрогитара',
  'Акустическая гитара',
  'Укулеле'
];

export const STRINGS_COUNT = [4, 6, 7, 12];

export enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export enum ProductPageState {
  Characteristics = 'Характеристики',
  Description = 'Описание',
}

export enum Sort {
  Price = 'price',
  Date = 'date',
  Up = '1',
  Down = '-1'
}
