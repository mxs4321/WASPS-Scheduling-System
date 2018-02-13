import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'material-expansion-panel/dist/material-expansion-panel.min.css';
import store, { history } from './model';
import App from './controller/App';
import registerServiceWorker from './util/registerServiceWorker';
import { Switch, Route } from 'react-router';
import SignIn from './controller/SignIn';

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
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" render={SignIn} />
        <Route render={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
