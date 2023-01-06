import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import Cookies from 'js-cookie';

import { REACT_NATIVE_APP_ENV } from '@env';

import rootReducer from './reducers';

interface Action {
  type: string;
  payload: any;
}
declare const window: any;

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware =
  REACT_NATIVE_APP_ENV === 'development'
    ? [thunk, apiMiddleware, logger]
    : [thunk, apiMiddleware];

const rootReducerWithLogout = (state: any, action: Action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
    Cookies.remove('token');
  }
  return rootReducer(state, action);
};

const store = createStore(
  rootReducerWithLogout,
  composeEnhancer(applyMiddleware(...middleware))
);

export default function configureStore() {
  return store;
}

export type RootState = ReturnType<typeof store.getState>;
