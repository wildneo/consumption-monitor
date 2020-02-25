import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getData } from './store/actions';
import reducers from './store/reducers';
import App from './components/App';
import data from './data';
import 'typeface-roboto';

const store = createStore(
  reducers,
  composeWithDevTools(),
);

store.dispatch(getData({ data }));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);