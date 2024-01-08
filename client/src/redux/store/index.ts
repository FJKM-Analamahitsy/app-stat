import { appReducer, collapseReducer } from "@redux/reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    app: appReducer,
    collapse: collapseReducer,
  },
});

export default store;

export const subscribe = store.subscribe;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
