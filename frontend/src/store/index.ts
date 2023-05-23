import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/store/Theme/Theme.slice';
import userReducer from '@/store/User/User.slice';
import formReducer from '@/store/Forms/Forms.slice';
import playersReducer from '@/store/Players/Players.slice'

export const store = configureStore({
	reducer: {
		theme: themeReducer,
		user: userReducer,
		forms: formReducer,
		players: playersReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
