import 'reflect-metadata';
import RestApplication from './app/rest.js';
import { Container } from 'inversify';
import { AppComponent } from './types/app-component.enum.js';
import { createRestApplicationContainer } from './app/rest.container';
import { createUserContainer } from './modules/user/user.container';
import { createProductContainer } from './modules/product/product.container';

async function bootstrap() {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createProductContainer()
  );

  const application = mainContainer.get<RestApplication>(AppComponent.RestApplication);
  await application.init();
}

bootstrap();
