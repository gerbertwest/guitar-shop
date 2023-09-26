import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
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
import UpdateProductDto from './dto/update-product.dto.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { ValidateObjectIdMiddleware } from '../../core/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middleware/document-exists.middleware.js';
//import UploadImageResponse from './rdo/upload-image.response.js';
import { UploadFileMiddleware } from '../../core/middleware/upload-file.middleware.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { PrivateRouteMiddleware } from '../../core/middleware/private-route.middleware.js';

type ParamsProductDetails = {
  productId: string;
} | ParamsDictionary

@injectable()
export default class ProductController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @inject(AppComponent.ConfigInterface) protected readonly configService: ConfigInterface<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for FilmController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/type', method: HttpMethod.Get, handler: this.findProductsByType});
    this.addRoute({path: '/strings', method: HttpMethod.Get, handler: this.findProductsByStrings});
    this.addRoute({path: '/sort', method: HttpMethod.Get, handler: this.sortByPrice});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateProductDto)
      ]
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(this.productService, 'Product', 'productId'),
      ]
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(this.productService, 'Product', 'productId')
      ]
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new ValidateDtoMiddleware(UpdateProductDto),
        new DocumentExistsMiddleware(this.productService, 'Product', 'productId')
      ]
    });
    this.addRoute({
      path: '/:productId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(this.productService, 'Product', 'productId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'productImage'),
      ]
    });
  }

  public async create(
    { body, user }: Request<Record<string, unknown>, Record<string, unknown>, CreateProductDto>,
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

    const result = await this.productService.create({ ...body, userId: user.id });
    const product = await this.productService.findById(result.id);
    this.created(
      res,
      fillDTO(ProductRdo, product)
    );
  }

  public async index(
    { query }: Request<ParamsProductDetails, Record<string, unknown>, Record<string, unknown>, RequestQuery>,
    res: Response): Promise<void> {
    const products = await this.productService.find(query.limit, query.sortType);
    this.ok(res, fillDTO(ProductRdo, products));
  }

  public async show(
    {params}: Request<ParamsProductDetails>,
    res: Response
  ): Promise<void> {
    const {productId} = params;
    const product = await this.productService.findById(productId);
    this.ok(res, fillDTO(ProductRdo, product));
  }

  public async delete(
    {params}: Request<ParamsProductDetails>,
    res: Response
  ): Promise<void> {
    const {productId} = params;
    const result = await this.productService.deleteById(productId);
    this.noContent(res, result);
  }

  public async update(
    {body, params}: Request<ParamsProductDetails, Record<string, unknown>, UpdateProductDto>,
    res: Response
  ): Promise<void> {
    const updateProduct = await this.productService.updateById(params.productId, body);
    this.ok(res, fillDTO(ProductRdo, updateProduct));
  }

  public async findProductsByType(
    { query }: Request<ParamsProductDetails, Record<string, unknown>, Record<string, unknown>, RequestQuery>,
    res: Response
  ): Promise<void> {
    const productsByType = await this.productService.findByType(query.limit, query.type);
    this.ok(res, fillDTO(ProductRdo, productsByType));
  }

  public async findProductsByStrings(
    { query }: Request<ParamsProductDetails, Record<string, unknown>, Record<string, unknown>, RequestQuery>,
    res: Response
  ): Promise<void> {
    const productsByStrings = await this.productService.findByStrings(query.limit, query.stringsCount);
    this.ok(res, fillDTO(ProductRdo, productsByStrings));
  }

  public async sortByPrice(
    { query }: Request<ParamsProductDetails, Record<string, unknown>, Record<string, unknown>, RequestQuery>,
    res: Response): Promise<void> {
    const products = await this.productService.sortByPrice(query.sortType, query.limit);
    this.ok(res, fillDTO(ProductRdo, products));
  }

  public async uploadImage(req: Request, res: Response) {
    const {productId} = req.params;
    const uploadFile = {productImage: req.file?.filename};
    await this.productService.updateById(productId, uploadFile);
    this.created(res, uploadFile);
  }

}
