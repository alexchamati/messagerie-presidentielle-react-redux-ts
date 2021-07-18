import filterReducer from "./filterReducer";
import messageReducer from "./messageReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    messages: messageReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
