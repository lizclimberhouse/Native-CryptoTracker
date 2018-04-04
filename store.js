import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import apiMiddleware from 'redux-devise-axios'; swap this out for below

import apiMiddleware from './apiMiddleware';
import rootReducer from './reducers/index';
import axios from 'axios';

const options = { axios };

const enhancers = compose(
  applyMiddleware(thunk, apiMiddleware(options)),
  // window.devToolsExtension ? window.devToolsExtension() : f => f
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
);

const store = createStore(rootReducer, {}, enhancers);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
