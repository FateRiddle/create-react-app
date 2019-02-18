import React from 'react';
import { hydrate, render } from 'react-dom';
import 'tachyons';
import './index.scss';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './model';

function Root() {
  return (
    <Provider store={configureStore()}>
      <App />
    </Provider>
  );
}

const rootEl = document.getElementById('root');

if (rootEl.hasChildNodes()) {
  hydrate(<Root />, rootEl);
} else {
  render(<Root />, rootEl);
}
