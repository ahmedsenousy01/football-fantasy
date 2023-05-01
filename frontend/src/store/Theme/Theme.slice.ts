import { RootState } from '@/store/index';
import BrowserDB from '@/utils/BrowserDB';
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  theme: "light" | "dark";
}

const initialState: ThemeState = {
  theme: BrowserDB.get("theme") ?? "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeToggle: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      BrowserDB.set("theme", state.theme);
    },
  },
});

export const { themeToggle } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.theme;
export default themeSlice.reducer;
