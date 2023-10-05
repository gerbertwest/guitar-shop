import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { checkAuthAction, fetchProductsAction } from './store/api-actions';
import { store } from './store/index';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Sort } from './const';

store.dispatch(checkAuthAction());
store.dispatch(fetchProductsAction(Sort.Down));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
);
