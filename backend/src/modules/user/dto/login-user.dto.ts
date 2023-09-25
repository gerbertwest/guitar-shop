import { IsEmail, IsString, Length } from 'class-validator';
import { UserError, Value } from '../user.constant.js';

export default class LoginUserDto {
  @IsEmail({}, {message: UserError.Email})
  public email!: string;

  @IsString({message: UserError.Password})
  @Length(Value.MinPassword, Value.MaxPassword, {message: UserError.PasswordLength})
  public password!: string;
}
