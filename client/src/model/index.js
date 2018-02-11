import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import app from './app';
import auth from './auth';
import ajax from './ajax';
import rides from './rides';
import users from './users';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({ app, auth, ajax, rides, users }),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
