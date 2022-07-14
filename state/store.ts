import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./ducks/auth";
import settingsReducer from "./ducks/settings";
import userManagerReducer from "./ducks/user-manager";
import sparePartsReducer from "./ducks/spare-parts";
import finderReducer from "./ducks/finder/reducers";

const reducer = {
  auth: authReducer,
  userManager: userManagerReducer,
  settings: settingsReducer,
  spareParts: sparePartsReducer,
  finder: finderReducer,
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
