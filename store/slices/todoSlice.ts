import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Todo interface
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Define the state interface
interface TodoState {
  items: Todo[];
  nextId: number;
}

// Initial state
const initialState: TodoState = {
  items: [],
  nextId: 1
};

// Create the slice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // CREATE
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: state.nextId,
        title: action.payload,
        completed: false
      });
      state.nextId += 1;
    },
    
    // UPDATE
    updateTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const todo = state.items.find(item => item.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    
    // TOGGLE
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    
    // DELETE
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

// Export actions
export const { addTodo, updateTodo, toggleTodo, deleteTodo } = todoSlice.actions;

// Export reducer
export default todoSlice.reducer;