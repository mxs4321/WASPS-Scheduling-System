import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import auth from './auth';
import ajax from './ajax';
import rides from './rides';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({ auth, ajax, rides }),
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
