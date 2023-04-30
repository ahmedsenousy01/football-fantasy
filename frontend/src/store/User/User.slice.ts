// noinspection JSUnusedLocalSymbols

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';
import userDetailsRequest from '@/api/requests/authentication/details';

export interface UserDetails {
	firstName: string;
	lastName: string;
	email: string;
	isVerified: boolean;
	profilePicture: string;
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
		return response.data.data;
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
				console.log('Waiting for user details');
			})
			.addCase(fetchUserDetails.fulfilled, (state: UserState, action) => {
				state.details = action.payload;
			});
	},
});

export const selectUser = (state: RootState) => state.user;
export const selectUserDetails = (state: RootState) => state.user.details;
export default UserSlice.reducer;
