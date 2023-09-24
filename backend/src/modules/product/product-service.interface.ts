import {DocumentType} from '@typegoose/typegoose';
import CreateProductDto from './dto/create-product.dto';
import { ProductEntity } from './product.entity';
import { SortType } from '../../types/sort-type.enum';
import UpdateProductDto from './dto/update-product.dto';

export interface ProductServiceInterface {
  create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>>;
  findById(productId: string): Promise<DocumentType<ProductEntity> | null>;
  findByProductName(productName: string): Promise<DocumentType<ProductEntity> | null>;
  find(sortType?: SortType, count?: number): Promise<DocumentType<ProductEntity>[]>;
  deleteById(filmId: string): Promise<DocumentType<ProductEntity> | null>;
  updateById(filmId: string, dto: UpdateProductDto): Promise<DocumentType<ProductEntity> | null>;
  findByFilter(type?: string[], stringsCount?: number[], count?: number): Promise<DocumentType<ProductEntity>[]>;
}
