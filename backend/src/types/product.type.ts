import { GuitarType } from './guitar-type.enum';
import { StringsCount } from './strings-count.enum';
import { User } from './user.type';

export type Product = {
  title: string;
  description: string;
  postDate: Date;
  productImage: string;
  type: GuitarType;
  code: string;
  stringsCount: StringsCount
  price: number;
  user: User;
}
