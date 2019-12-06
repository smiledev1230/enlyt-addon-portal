import React from 'react';
import { render } from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './App';

import './sass/index.scss'

const initialState = window.INITIAL_STATE;
const store = createStore((state=initialState) => state);

const el = document.getElementById('root');
if (el) {
  render(
    <Provider store={store}>
      <App/>
    </Provider>,
    el
  );
}
