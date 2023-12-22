import { appReducer } from "@redux/reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
