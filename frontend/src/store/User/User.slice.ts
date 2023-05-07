// noinspection JSUnusedLocalSymbols

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';
import {AxiosError} from 'axios';
import {userDetailsRequest} from "@/api/requests/User";

export interface League {
	name:string;
	flag:string;
	logo:string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  profilePicture: string | null;
  budget: number;
  role: string;
  league: League;
  teams: any[];
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
	'user/getDetails',
	async (state, action) => {
		const response = await userDetailsRequest();
		if(response instanceof AxiosError){
			return response.response?.data;
		} else {
			return response.data.data;
		}
	}
);

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setDetails: (
			state,
			{ payload: details }: PayloadAction<UserDetails>
		) => {
			state.details = details;
		},
	},
	extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state: UserState, action) => {
        state.loadingDetails = true;
        console.log("awaiting details")
      })
			.addCase(fetchUserDetails.fulfilled, (state: UserState, action) => {
        state.details = action.payload;
        state.loadingDetails = false;
      })
      .addCase(fetchUserDetails.rejected, (state: UserState, action) => {
        console.warn("User details didn't come through");
        state.loadingDetails = false;
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export const selectUserDetails = (state: RootState) => state.user.details;
export const selectIsLoadingUserDetails = (state: RootState) => state.user.loadingDetails;
export const selectUserRole = (state: RootState) => state.user.details?.role;
export default UserSlice.reducer;
