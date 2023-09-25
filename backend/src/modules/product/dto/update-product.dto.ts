import { IsString, MinLength, MaxLength, Contains, IsEnum, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { GuitarType } from '../../../types/guitar-type.enum.js';
import { StringsCount } from '../../../types/strings-count.enum.js';
import { Length, ProductError } from '../product.constant.js';

export default class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(Length.MinTitle, {message: ProductError.MinTitleLength})
  @MaxLength(Length.MaxTitle, {message: ProductError.MaxTitleLength})
  public title?: string;

  @IsOptional()
  @IsString()
  @MinLength(Length.MinDescription, {message: ProductError.MinDescriptionLength})
  @MaxLength(Length.MaxDescription, {message: ProductError.MaxDescriptionLength})
  public description?: string;

  @IsOptional()
  @IsString({message: ProductError.ProductImage})
  @Contains('.jpg' || '.png', {message: ProductError.ProductImageContains})
  public productImage?: string;

  @IsOptional()
  @IsEnum(GuitarType, {message: ProductError.GuitarType})
  public type?: GuitarType;

  @IsOptional()
  @IsString()
  @MinLength(Length.MinCode, {message: ProductError.MinCodeLength})
  @MaxLength(Length.MaxCode, {message: ProductError.MaxCodeLength})
  public code?: string;

  @IsOptional()
  @IsEnum(StringsCount, {message: ProductError.StringsCount})
  public stringsCount?: StringsCount;

  @IsOptional()
  @IsNumber()
  @Min(Length.MinPrice, {message: ProductError.MinPriceLength})
  @Max(Length.MaxPrice, {message: ProductError.MaxPriceLength})
  public price?: number;
}
