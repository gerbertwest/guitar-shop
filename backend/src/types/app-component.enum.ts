export const AppComponent = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  ProductServiceInterface: Symbol.for('ProductServiceInterface'),
  ProductModel: Symbol.for('ProductModel'),
  ProductController: Symbol.for('ProductController'),
  UserController: Symbol.for('UserController'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
} as const;
