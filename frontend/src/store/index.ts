import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./Theme/Theme.slice";
import userReducer from "./User/User.slice";
import formReducer from "./Forms/Forms.slice"

export const store = configureStore({
  reducer:{
    theme: themeReducer,
    user: userReducer,
    forms: formReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;