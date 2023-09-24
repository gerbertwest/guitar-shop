import { GuitarType } from '../../../types/guitar-type.enum';
import { StringsCount } from '../../../types/strings-count.enum';

export default class CreateProductDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public productImage!: string;
  public type!: GuitarType;
  public code!: string;
  public stringsCount!: StringsCount;
  public price!: number;
  public userId!: string;
}
