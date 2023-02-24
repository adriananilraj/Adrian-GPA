import { combineReducers, configureStore } from '@reduxjs/toolkit'
import indexSlice from './indexSlice';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: indexSlice,
});

export const wrapper = createWrapper(store)

