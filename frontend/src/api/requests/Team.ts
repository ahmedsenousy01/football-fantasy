import api from "@/utils/api/Api";

// ---- SELL PLAYER -----
export function sellPlayerRequest(playerId: string) {
  return api.put(`/teams/sell/${playerId}`);
}

// ---- BUY PLAYER -----
export function buyPlayerRequest(playerId: string) {
  return api.put(`/teams/buy/${playerId}`);
}
