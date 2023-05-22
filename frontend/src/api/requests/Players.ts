import api from "@/utils/api/Api";
import { Player, PlayerStatistics, Position } from "@/types/Game";
import { dataToSearchParams } from "@/utils/Url/Url";

// ----- CREATE PLAYER -----
export interface createPlayerRequestBody {
  name: string;
  age: number;
  picture: string;
  position: Position;
  leagueId: string;
  statistics: {
    minutesPerGame: {
      current: Record<string, number>;
      total: number;
    };
  };
}
export function postPlayerRequest(player: createPlayerRequestBody) {
  return api.post("/players", player);
}

// ----- GET PLAYERS -----
export interface getPlayersPageResponseData {
  page: {
    current: number;
    total: number;
  };
  results: Player[];
}
export function getPlayersPage(leagueId: string, page?: number) {
  let searchParams = dataToSearchParams({
    id: leagueId,
    page: page?.toString() ?? "1",
  });
  return api.get(`/players?${searchParams.toString()}`);
}

// ----- GET PLAYER -----
export function getPlayer(playerId: string) {
  return api.get(`/players/${playerId}`);
}

// ----- UPDATE PLAYER -----
export interface putPlayerRequestBody {
  name?: string;
  points?: number;
  statistics?: PlayerStatistics;
}
export function putPlayer(playerId: string, body: putPlayerRequestBody) {
  return api.put(`/players/${playerId}`, body);
}

// ----- SEARCH PLAYERS -----
export function searchPlayers(name: string, page: number) {
  return api.get(
    `/search/players${dataToSearchParams({ name, page: page.toString() })}`
  );
}
