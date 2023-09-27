export enum AppRoute {
  Registration = '/register',
  Products = '/products/',
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
  Products = '/products/',
  Login = 'users/login',
  Logout = 'users/logout',
  Register = '/users/register',
}

export const REDIRECT_ACTION_NAME = 'main/redirectToRoute';
