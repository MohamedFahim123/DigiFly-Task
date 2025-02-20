import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import userReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
