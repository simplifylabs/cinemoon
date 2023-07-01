import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models';

export const store = init({
  models,
});

export type Store = typeof store;
export type RootState = RematchRootState<RootModel>;
export type RootDispatch = RematchDispatch<RootModel>;
