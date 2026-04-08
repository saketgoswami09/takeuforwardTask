import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../features/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Interview Tip: Often turned off for non-serializable data like Dates
    }),
});
