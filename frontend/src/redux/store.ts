import { configureStore } from '@reduxjs/toolkit';
import signinReducer from './slices/signInSlice';
import roomsReducer from './slices/roomsSlice';

export const store = configureStore({
  reducer: {
    signIn: signinReducer,
    rooms: roomsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
