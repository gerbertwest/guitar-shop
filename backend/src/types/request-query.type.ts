import { GuitarType } from './guitar-type.enum.js';
import { StringsCount } from './strings-count.enum';

export type RequestQuery = {
  limit?: number;
  type?: GuitarType[];
  stringsCount?: StringsCount[];
}
