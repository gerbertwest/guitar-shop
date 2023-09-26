import { GuitarType } from './guitar-type.enum.js';
import { SortType } from './sort-type.enum';
import { StringsCount } from './strings-count.enum';

export type RequestQuery = {
  limit?: number;
  type?: GuitarType[];
  stringsCount?: StringsCount[];
  sortType?: SortType;
  page?: number
}
