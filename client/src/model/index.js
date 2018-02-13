import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';
import app from './app';
import auth from './auth';
import ajax from './ajax';
import rides from './rides';
import users from './users';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHistory();

export default createStore(
  combineReducers({ app, auth, ajax, rides, users, router }),
  composeEnhancers(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(routerMiddleware(history))
  )
);
