import React, { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import storeGlobalCoins from './app/storeGlobalCoins';
import { ThemeProvider } from './contexts/themeContext';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={storeGlobalCoins}>
    <ThemeProvider>
      <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  ,
);