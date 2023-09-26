export const JWT_ALGORITHM = 'HS256';

export enum Value {
  MinName = 1,
  MaxName = 15,
  MinPassword = 6,
  MaxPassword = 12,
}

export enum UserError {
  NameLength = 'Min length for name is 1, max is 15',
  PasswordLength = 'Min length for password is 6, max is 12',
  Email = 'email must be valid address',
  Password = 'password is required',
  Name = 'userName is required',
}
