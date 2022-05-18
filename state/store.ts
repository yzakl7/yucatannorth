import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./ducks/auth";
import userManagerReducer from "./ducks/user-manager/reducers";

const reducer = {
  auth: authReducer,
  userManager: userManagerReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
