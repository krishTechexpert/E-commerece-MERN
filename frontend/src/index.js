import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './Store';
import {Provider} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";

import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from "redux-persist";

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      

      </BrowserRouter>
  </Provider>
);


