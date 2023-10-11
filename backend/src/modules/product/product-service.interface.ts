import {DocumentType} from '@typegoose/typegoose';
import CreateProductDto from './dto/create-product.dto';
import { ProductEntity } from './product.entity';
import UpdateProductDto from './dto/update-product.dto';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import { SortType } from '../../types/sort-type.enum.js';

export interface ProductServiceInterface extends DocumentExistsInterface {
  create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>>;
  findById(productId: string): Promise<DocumentType<ProductEntity> | null>;
  findByProductName(productName: string): Promise<DocumentType<ProductEntity> | null>;
  find(page?:number, count?: number, sortDirection?: SortType, sort?: string, type?: string[], stringsCount?: number[]): Promise<DocumentType<ProductEntity>[]>;
  deleteById(productId: string): Promise<DocumentType<ProductEntity> | null>;
  updateById(productId: string, dto: UpdateProductDto): Promise<DocumentType<ProductEntity> | null>;
  // findByFilter(count?: number, type?: string[], stringsCount?: number[]): Promise<DocumentType<ProductEntity>[]>;
  // findByStrings(count?: number, stringsCount?: number[]): Promise<DocumentType<ProductEntity>[]>;
  // sortByPrice(type?: SortType, count?: number): Promise<DocumentType<ProductEntity>[]>;
}
