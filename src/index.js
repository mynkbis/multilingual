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



  const getlocation = async (e) => {
        e.preventDefault();
     if (navigator.geolocation) {
     await navigator.geolocation.getCurrentPosition(function (getCurrentPosition) {
        const coords = [{
          "lati": getCurrentPosition.coords.latitude,
          "longi": getCurrentPosition.coords.longitude
        }]
      localStorage.setItem("Cords", JSON.stringify(coords))
         });
    } else {
      alert("error occured while fetching your location")
    }
  }

const root = ReactDOM.createRoot(document.getElementById('root'));
 window.onload = function (e) {
                        getlocation(e);
};

root.render(  
    <BrowserRouter>
      <Provider store={store}> 
         <Suspense fallback="...is loading">
          <App />
          </Suspense>
      </Provider>
      </BrowserRouter>
 
);

