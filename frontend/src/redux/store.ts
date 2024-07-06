import { configureStore } from '@reduxjs/toolkit';
import signInSlice from './slices/signInSlice';

export const store = configureStore({
  reducer: {
    signIn: signInSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
