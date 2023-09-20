/* eslint-disable import/prefer-default-export */
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from 'src/reducers';
import { ENABLE_REDUX_LOGGER } from 'src/constants/constants';

const logger = createLogger();

export function configureStore(preloadedState = {}) {
  const middleware = [thunkMiddleware];

  if (ENABLE_REDUX_LOGGER) {
    middleware.push(logger);
  }

  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middleware)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
