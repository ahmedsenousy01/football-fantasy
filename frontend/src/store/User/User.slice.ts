import {AnyAction, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import BrowserDB from "../../BrowserDB";
import {RootState} from "../index";

export interface UserDetails {
  firstName:string;
  lastName:string;
  email:string;
  isVerified:boolean;
  profilePicture:string;
}

interface UserState {
  token?: string;
  details?: UserDetails
}

const initialState:UserState = {
  token: BrowserDB.get("authToken"),
  details: undefined
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    setToken: (state, {payload: token}) => {
      state.token = token;
    },
    setDetails: (state, {payload: details}:PayloadAction<UserDetails>) => {
      state.details = details;
    }
  }
})

// const userDetailsThunk = ():ThunkAction<void, RootState, unknown, AnyAction> =>
//   async (dispatch, getState) => {
//     const token = getState().user.token;
//
//   }

export const {setToken, setDetails} = UserSlice.actions;
export const selectUser = (state:RootState) => state.user;
export const selectAuthToken = (state:RootState) => state.user.token;
export const selectUserDetails = (state:RootState) => state.user.details;
export default UserSlice.reducer;