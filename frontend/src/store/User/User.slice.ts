// noinspection JSUnusedLocalSymbols

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/index";
import { AxiosError } from "axios";
import { userDetailsRequest } from "@/api/requests/User";
import { Team } from "@/types/Game";

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  profilePicture: string | null;
  budget: number;
  role: string;
  league: string;
  team: Team;
}

interface UserState {
  details?: UserDetails;
  loadingDetails: boolean;
}

const initialState: UserState = {
  details: undefined,
  loadingDetails: false,
};

export const fetchUserDetails = createAsyncThunk(
  "user/getDetails",
  async (state, action) => {
    const response = await userDetailsRequest();
    if (response instanceof AxiosError) {
      return response.response?.data;
    } else {
      return response.data.data;
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDetails: (state, { payload: details }: PayloadAction<UserDetails>) => {
      state.details = details;
    },
    clearDetails: (state) => {
      state.details = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state: UserState, action) => {
        state.loadingDetails = true;
        console.log("awaiting details");
      })
      .addCase(fetchUserDetails.fulfilled, (state: UserState, action) => {
        state.details = action.payload;
        console.log(state.details);
        state.loadingDetails = false;
      })
      .addCase(fetchUserDetails.rejected, (state: UserState, action) => {
        console.warn("User details didn't come through");
        state.loadingDetails = false;
      });
  },
});

export const { clearDetails: clearUserDetails } = UserSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserDetails = (state: RootState) => state.user.details;
export const selectUserLeague = (state: RootState) =>
  state.user.details?.league;
export const selectIsLoadingUserDetails = (state: RootState) =>
  state.user.loadingDetails;
export const selectUserRole = (state: RootState) => state.user.details?.role;
export default UserSlice.reducer;
