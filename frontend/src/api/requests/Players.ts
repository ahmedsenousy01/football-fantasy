import api from "@/utils/api/Api";
import {Player} from "@/types/Game";

export function createPlayerRequest(player: Player) {
  return api.post("/players", player);
}

export function getPlayers(leagueId: string, page?: number) {
  let searchParams = new URLSearchParams();
  searchParams.set("page", page?.toString() ?? "0");
  return api.get(`/players/${leagueId}?${searchParams.toString()}`);
}
