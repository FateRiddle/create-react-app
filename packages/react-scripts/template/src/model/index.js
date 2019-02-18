import { create } from 'dva-core';
import createLoading from 'dva-loading';
import logger from 'redux-logger';
import games from './Game';
import contents from './Content';

export const configureStore = () => {
  const app = create();
  // models
  app.model(games);
  app.model(contents);
  // plugins
  app.use(createLoading());
  // app.use({ onAction: logger })
  app.start();

  return app._store;
};
