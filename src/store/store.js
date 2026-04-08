import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/calendarSlice';
import themeReducer from '../features/calendarSlice';
import calendarReducer from '../features/calendarSlice';

export const store = configureStore({
  // 1. Combining Reducers: 
  // Each key here represents a 'slice' of your global state tree.
  reducer: {
    todo: todoReducer,
    theme: themeReducer,
    calendar: calendarReducer,
  },
  
  // 2. Middleware (Optional in interviews, but shows depth):
  // RTK adds Thunk by default, but you can add custom ones here.
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Interview Tip: Often turned off for non-serializable data like Dates
    }),
});