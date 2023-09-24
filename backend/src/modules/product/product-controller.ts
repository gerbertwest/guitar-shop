import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';

import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { ProductServiceInterface } from './product-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
import CreateProductDto from './dto/create-product.dto.js';
import HttpError from '../../core/errors/http-error.js';
import { fillDTO } from '../../core/helpers/index.js';
import ProductRdo from './rdo/product.rdo.js';

@injectable()
export default class ProductController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.ProductServiceInterface) private readonly productService: ProductServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateProductDto>,
    res: Response,
  ): Promise<void> {
    const existsProduct = await this.productService.findByProductName(body.title);

    if (existsProduct) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Product with name «${body.title}» exists.`,
        'ProductController'
      );
    }

    const result = await this.productService.create(body);
    const product = await this.productService.findById(result.id);
    this.created(
      res,
      fillDTO(ProductRdo, product)
    );
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const products = await this.productService.find();
    this.ok(res, fillDTO(ProductRdo, products));
  }
}
