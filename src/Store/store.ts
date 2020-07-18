// #region Global Imports
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createWrapper } from 'next-redux-wrapper';
// #endregion Global Imports

// #region Local Imports
import Reducers from './Reducers';
// #endregion Local Imports

export const makeStore = () =>
  createStore(
    Reducers,
    {},
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

export const wrapper = createWrapper(makeStore, {});
