import {RootState} from "../index";
import BrowserDB from "../../BrowserDB";
import {createSlice} from "@reduxjs/toolkit";

interface ThemeState{
  theme: "light"|"dark"
}

const initialState:ThemeState = {
  theme: BrowserDB.get("theme") ?? "dark"
}

export const themeSlice = createSlice({
  name:"theme",
  initialState,
  reducers: {
    toggle: state => {
      state.theme = state.theme === "light" ? "dark" : "light";
      BrowserDB.set("theme", state.theme);
    }
  }
});

export const {toggle} = themeSlice.actions;
export const selectTheme = (state:RootState) => state.theme.theme;
export default themeSlice.reducer;