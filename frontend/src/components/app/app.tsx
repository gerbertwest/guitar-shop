import { AppRoute, AuthorizationStatus } from '../../const';
import ErrorScreen from '../../pages/error-screen';
import MainScreen from '../../pages/main-screen';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import ProductListScreen from '../../pages/product-list-screen';
import ProductScreen from '../../pages/product-screen';
import AddProductScreen from '../../pages/add-product-screen';
import RegistrationScreen from '../../pages/registration-screen';
import EditProductScreen from '../../pages/edit-product-screen';
import PrivateRoute from '../private-route';
import { HelmetProvider } from 'react-helmet-async';

function App(): JSX.Element {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen/>}
          />
          <Route
            path={AppRoute.Products}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <ProductListScreen/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Product}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <ProductScreen/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.NewProduct}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <AddProductScreen/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.EditProduct}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <EditProductScreen/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Registration}
            element={<RegistrationScreen/>}
          />
          <Route
            path="*"
            element={<ErrorScreen/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
