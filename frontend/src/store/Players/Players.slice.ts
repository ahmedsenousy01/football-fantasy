import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { selectUserLeague } from "@/store/User/User.slice";
import { RootState } from "@/store/index";
import {
  getPlayer,
  getPlayersPage,
  getPlayersPageResponseData,
} from "@/api/requests/Players";
import { Player } from "@/types/Game";
import { assertDefined } from "@/utils/error/assert";

interface PlayersState {
  editingPlayer: boolean;
  player?: Player;
  players: Player[];
  totalPageCount: number;
}

const initialState: PlayersState = {
  editingPlayer: false,
  players: [],
  totalPageCount: 0,
};

export const searchPlayers = createAsyncThunk(
  "players/searchPlayers",
  async ({ name, page }: { name: string; page: number }, config) => {}
);

export const fetchPlayersPage = createAsyncThunk(
  "players/fetchPlayers",
  async (page: number, config) => {
    const state = config.getState() as RootState;
    const leagueId = selectUserLeague(state);
    if (leagueId === undefined) {
      return config.rejectWithValue({
        status: 400,
        message: "league id was not defined",
      });
    }
    const players = await getPlayersPage("6444fb4b5eda8c2223b29b70", page);
    return players.data;
  }
);

export const fetchPlayerById = createAsyncThunk(
  "players/fetchPlayer",
  async (id: string, config) => {
    const player = await getPlayer(id);
    return player.data;
  }
);

const playersSlice = createSlice({
  name: "players",
  initialState: initialState,
  reducers: {
    setPlayer: (state: PlayersState, { payload }: PayloadAction<Player>) => {
      assertDefined(payload, "player undefined");
      state.player = payload;
    },
    startEditingPlayer: (state: PlayersState) => {
      state.editingPlayer = true;
    },
    stopEditingPlayer: (state: PlayersState) => {
      state.editingPlayer = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayersPage.fulfilled, (state, action) => {
        const responseData = action.payload as getPlayersPageResponseData;
        state.players = responseData.results;
        state.totalPageCount = responseData.page.total;
      })
      .addCase(fetchPlayerById.fulfilled, (state, action) => {
        state.player = action.payload as Player;
        state.editingPlayer = false;
      });
  },
});

export const { startEditingPlayer, setPlayer, stopEditingPlayer } =
  playersSlice.actions;

export const selectPlayer = (state: RootState) => state.players.player;
export const selectPlayers = (state: RootState) => state.players.players;
export const selectEditingPlayer = (state: RootState) =>
  state.players.editingPlayer;
export const selectTotalPages = (state: RootState) =>
  state.players.totalPageCount;
export default playersSlice.reducer;
