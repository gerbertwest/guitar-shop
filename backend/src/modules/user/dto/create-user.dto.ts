import { IsEmail, IsString, Length } from 'class-validator';
import { Value, UserError } from '../user.constant.js';

export default class CreateUserDto {
  @IsEmail({}, {message: UserError.Email})
  public email!: string;

  @IsString({message: UserError.Name})
  @Length(Value.MinName, Value.MaxName, {message: UserError.NameLength})
  public name!: string;

  @IsString({message: UserError.Password})
  @Length(Value.MinPassword, Value.MaxPassword, {message: UserError.PasswordLength})
  public password!: string;
}
