import React from 'react';
import ReactDOM from 'react-dom';
import App from './controller/App';
import registerServiceWorker from './util/registerServiceWorker';
import { injectGlobal } from 'styled-components';
import 'material-expansion-panel/dist/material-expansion-panel.min.css';

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

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
