export enum AppRoute {
  Registration = '/register',
  Products = '/products',
  Product = '/product/:id',
  Main = '/',
  NewProduct = '/create',
  EditProduct = 'edit',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
