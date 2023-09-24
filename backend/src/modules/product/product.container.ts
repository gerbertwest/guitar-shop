import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { ProductServiceInterface } from './product-service.interface.js';
import { ProductEntity, ProductModel } from './product.entity.js';
import ProductService from './product.service.js';
import { ControllerInterface } from '../../core/controller/controller.interface';
import ProductController from './product-controller.js';

export function createProductContainer() {
  const productContainer = new Container();

  productContainer.bind<ProductServiceInterface>(AppComponent.ProductServiceInterface).to(ProductService);
  productContainer.bind<types.ModelType<ProductEntity>>(AppComponent.ProductModel).toConstantValue(ProductModel);
  productContainer.bind<ControllerInterface>(AppComponent.ProductController).to(ProductController).inSingletonScope();

  return productContainer;
}
