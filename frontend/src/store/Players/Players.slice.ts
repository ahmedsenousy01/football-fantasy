import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Player} from "@/types/Game";
import {selectUserLeague} from "@/store/User/User.slice";
import {RootState} from "@/store/index";
import {getPlayers} from "@/api/requests/Players";

interface PlayersState{
  players: Player[];
  page: number;
}

const initialState:PlayersState = {
  players: [],
  page: 0
};

export const fetchPlayersPage = createAsyncThunk(
  "players/fetchPlayers",
  async (empty, config) => {
    const state = config.getState() as RootState;
    console.log("state: ", state);
    const leagueId = selectUserLeague(state)?._id;
    if(leagueId === undefined){
      return config.rejectWithValue({
        status: 400,
        message: "league id was not defined"
      });
    }
    console.log("getting players")
    return await getPlayers(leagueId, state.players.page);
  }
)

const playersSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlayersPage.fulfilled, (state, action) => {
        console.log(action);
      })
  }
});

export default playersSlice.reducer;