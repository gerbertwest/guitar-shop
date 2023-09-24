import { injectable, inject } from 'inversify';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateProductDto from './dto/create-product.dto';
import { ProductServiceInterface } from './product-service.interface.js';
import { ProductEntity } from './product.entity.js';

@injectable()
export default class ProductService implements ProductServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ProductModel) private readonly filmModel: types.ModelType<ProductEntity>
  ) {}

  public async create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New filmId created: ${dto.title}`);

    return result;
  }

  public async findById(filmId: string): Promise<DocumentType<ProductEntity> | null> {
    return this.filmModel.findById(filmId).exec();
  }
}
