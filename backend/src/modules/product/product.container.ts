import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { AppComponent } from '../../types/app-component.enum.js';
import { ProductServiceInterface } from './product-service.interface.js';
import { ProductEntity, ProductModel } from './product.entity.js';
import ProductService from './product.service.js';

export function createProductContainer() {
  const productContainer = new Container();

  productContainer.bind<ProductServiceInterface>(AppComponent.ProductServiceInterface).to(ProductService);
  productContainer.bind<types.ModelType<ProductEntity>>(AppComponent.ProductModel).toConstantValue(ProductModel);

  return productContainer;
}
