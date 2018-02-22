import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';
import app from './app';
import auth from './auth';
import ajax from './ajax';
import rides from './rides';
import users from './users';
import availability from './availability';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHistory();

export default createStore(
  combineReducers({ ajax, app, auth, availability, rides, router, users }),
  composeEnhancers(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(routerMiddleware(history))
  )
);
