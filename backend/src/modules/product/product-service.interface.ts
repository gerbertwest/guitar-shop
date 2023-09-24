import {DocumentType} from '@typegoose/typegoose';
import CreateProductDto from './dto/create-product.dto';
import { ProductEntity } from './product.entity';

export interface ProductServiceInterface {
  create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>>;
  findById(productId: string): Promise<DocumentType<ProductEntity> | null>;
}
