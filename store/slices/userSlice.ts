import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//defining the object structure
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}
//defining state
interface UserState {
  items: User[];
  nextId: number;
}
//init state
const initialState: UserState = {
  items: [],
  nextId: 1,
};

//creating slice with CRUD stuff
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //CREATE - adds a new user
    addUser: (state, action: PayloadAction<Omit<User, "id">>) => {
      state.items.push({
        id: state.nextId,
        ...action.payload, //spreads all user properties
      });
      state.nextId += 1;
    },

    //UPDATE - updates entire user object
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.items.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index != -1) {
        state.items[index] = action.payload;
      }
    },
    //UPDATE(partial) - only specific field updates
    updateUserField: (
      state,
      action: PayloadAction<{ id: Number; updates: Partial<User> }>
    ) => {
      const user = state.items.find((user) => user.id === action.payload.id);
      if (user) {
        Object.assign(user, action.payload.updates);
      }
    },

    //DELETE - removes user(s)
    deleteUser: (state, action: PayloadAction<Number>) => {
      state.items = state.items.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, updateUserField, deleteUser } =
  userSlice.actions;
export default userSlice.reducer;
