import api from "@/utils/api/Api";
import {Player} from "../../types/Game";

function createPlayerRequest(player: Player) {
  return api.post("/players", player);
}

function getPlayers(leagueId: string, page?: number) {
  let searchParams = new URLSearchParams();
  searchParams.set("leagueId", leagueId);
  searchParams.set("page", page?.toString() ?? "0");
  return api.get("/players/" + searchParams.toString());
}
