import React from 'react';
import ReactDOM from 'react-dom/client';
  import './index.css';
import { useTranslation, initReactI18next } from "react-i18next";
 import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from './redux/store'
import { Provider } from 'react-redux';
import {IntlProvider} from "react-intl";
import { Suspense } from 'react';
import './i18n';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
    <BrowserRouter>
      <Provider store={store}> 
         <Suspense fallback="...is loading">
          <App />
          </Suspense>
      </Provider>
      </BrowserRouter>
 
);

