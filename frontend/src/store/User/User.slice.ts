// noinspection JSUnusedLocalSymbols

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';
import userDetailsRequest from '@/api/requests/authentication/details';
import { AxiosError } from 'axios';

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
	profilePicture: string|null;
	budget:number;
	role:string;
	league:League;
}

interface UserState {
	details?: UserDetails;
}

const initialState: UserState = {
	details: undefined,
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
			.addCase(fetchUserDetails.fulfilled, (state: UserState, action) => {
				state.details = action.payload;
			})
			.addCase(fetchUserDetails.rejected, (state: UserState, action) => {
				console.warn("User details didn't come through");
			});
	},
});

export const selectUser = (state: RootState) => state.user;
export const selectUserDetails = (state: RootState) => state.user.details;
export default UserSlice.reducer;
