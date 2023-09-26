import { injectable, inject } from 'inversify';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateProductDto from './dto/create-product.dto';
import { ProductServiceInterface } from './product-service.interface.js';
import { ProductEntity } from './product.entity.js';
import UpdateProductDto from './dto/update-product.dto.js';
import { DEFAULT_PRODUCT_COUNT } from './product.constant.js';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export default class ProductService implements ProductServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ProductModel) private readonly productModel: types.ModelType<ProductEntity>
  ) {}

  public async create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>> {
    const result = await this.productModel.create(dto);
    this.logger.info(`New productId created: ${dto.title}`);
    return result;
  }

  public async findById(productId: string): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findById(productId)
      .populate(['userId'])
      .exec();
  }

  public async findByProductName(productName: string): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel.findOne({title: productName}).exec();
  }

  public async find(count?: number, sortType?: SortType): Promise<DocumentType<ProductEntity>[]> {
    const limit = count ?? DEFAULT_PRODUCT_COUNT;
    const type = sortType ?? SortType.Down;
    return this.productModel
      .find({}, {}, {limit})
      .sort({createdAt: type})
      .populate(['userId'])
      .exec();
  }

  public async sortByPrice(type?: SortType, count?: number): Promise<DocumentType<ProductEntity>[]> {
    const limit = count ?? DEFAULT_PRODUCT_COUNT;
    const sortType = type ?? SortType.Down;
    return this.productModel
      .find({}, {}, {limit})
      .sort({price: sortType})
      .populate(['userId'])
      .exec();
  }

  public async findByType(count?: number, type?: string[]): Promise<DocumentType<ProductEntity>[]> {
    const limit = count ?? DEFAULT_PRODUCT_COUNT;
    return this.productModel
      .find({type: {$in: type}}, {}, {limit})
      .populate(['userId'])
      .exec();
  }

  public async findByStrings(count?: number, stringsCount?: number[]): Promise<DocumentType<ProductEntity>[]> {
    const limit = count ?? DEFAULT_PRODUCT_COUNT;
    return this.productModel
      .find({stringsCount: {$in: stringsCount}}, {}, {limit})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(productId: string): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findByIdAndDelete(productId)
      .exec();
  }

  public async updateById(productId: string, dto: UpdateProductDto): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findByIdAndUpdate(productId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.productModel
      .exists({_id: documentId})) !== null;
  }
}
