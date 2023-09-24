import { GuitarType } from '../../../types/guitar-type.enum';
import { StringsCount } from '../../../types/strings-count.enum';

export default class UpdateProductDto {
  public title?: string;
  public description?: string;
  public productImage?: string;
  public type?: GuitarType;
  public code?: string;
  public stringsCount?: StringsCount;
  public price?: number;
}
