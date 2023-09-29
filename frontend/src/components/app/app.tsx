import { AppRoute, AuthorizationStatus } from '../../const';
import ErrorScreen from '../../pages/error-screen';
import MainScreen from '../../pages/main-screen';
import {Route, Routes} from 'react-router-dom';
import ProductListScreen from '../../pages/product-list-screen';
import ProductScreen from '../../pages/product-screen';
import AddProductScreen from '../../pages/add-product-screen';
import RegistrationScreen from '../../pages/registration-screen';
import EditProductScreen from '../../pages/edit-product-screen';
import PrivateRoute from '../private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../hooks/index';
import HistoryRouter from '../history-route';
import browserHistory from '../../browser-history';
import LoadingScreen from '../../pages/loading-screen';

function App(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen/>}
          />
          <Route
            path={AppRoute.Products}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <ProductListScreen/>
              </PrivateRoute>
            }
          />

          <Route path={`${AppRoute.Products}/:id`}>
            <Route index element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <ProductScreen/>
              </PrivateRoute>
            }
            />
            <Route
              path={AppRoute.EditProduct}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                >
                  <EditProductScreen/>
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            path={AppRoute.NewProduct}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <AddProductScreen/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.EditProduct}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
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
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
