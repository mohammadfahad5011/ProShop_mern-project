import React from 'react';
//react redux purpose:
import {Provider} from 'react-redux';
import  store  from './store';

import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom' ;


import './bootstrap.min.css'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </Provider> 
);
