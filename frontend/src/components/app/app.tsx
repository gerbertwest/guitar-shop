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

function App(): JSX.Element {
  return (
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
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <ProductListScreen/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Product}
          element={<ProductScreen/>}
        />
        <Route
          path={AppRoute.NewProduct}
          element={<AddProductScreen/>}
        />
        <Route
          path={AppRoute.EditProduct}
          element={<EditProductScreen/>}
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
  );
}

export default App;
