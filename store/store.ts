import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import  userReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer,
  }
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;