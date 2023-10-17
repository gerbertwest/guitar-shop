import { Expose, Type } from 'class-transformer';
import { GuitarType } from '../../../types/guitar-type.enum.js';
import { StringsCount } from '../../../types/strings-count.enum.js';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class ProductRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public productImage!: string;

  @Expose({ name: 'createdAt'})
  public postDate!: Date;

  @Expose()
  public type!: GuitarType;

  @Expose()
  public code!: string;

  @Expose()
  public stringsCount!: StringsCount;

  @Expose()
  public price!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose()
  public total!: number;
}
