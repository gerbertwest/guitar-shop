import { IsEnum, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { GuitarType } from '../../../types/guitar-type.enum.js';
import { StringsCount } from '../../../types/strings-count.enum.js';
import { ProductError, Length } from '../product.constant.js';


export default class CreateProductDto {
  @IsString()
  @MinLength(Length.MinTitle, {message: ProductError.MinTitleLength})
  @MaxLength(Length.MaxTitle, {message: ProductError.MaxTitleLength})
  public title!: string;

  @IsString()
  @MinLength(Length.MinDescription, {message: ProductError.MinDescriptionLength})
  @MaxLength(Length.MaxDescription, {message: ProductError.MaxDescriptionLength})
  public description!: string;

  @IsEnum(GuitarType, {message: ProductError.GuitarType})
  public type!: GuitarType;

  @IsString()
  @MinLength(Length.MinCode, {message: ProductError.MinCodeLength})
  @MaxLength(Length.MaxCode, {message: ProductError.MaxCodeLength})
  public code!: string;

  @IsEnum(StringsCount, {message: ProductError.StringsCount})
  public stringsCount!: StringsCount;

  @IsNumber()
  @Min(Length.MinPrice, {message: ProductError.MinPriceLength})
  @Max(Length.MaxPrice, {message: ProductError.MaxPriceLength})
  public price!: number;

  public userId!: string;
}
