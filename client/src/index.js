import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'material-expansion-panel/dist/material-expansion-panel.min.css';
import store from './model';
import App from './controller/App';
import registerServiceWorker from './util/registerServiceWorker';

injectGlobal`
  html, body, #root {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;    
    padding: 0;
    margin: 0;
    background-color: #F2F2F2;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
