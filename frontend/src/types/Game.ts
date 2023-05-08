export const allLeagues = [
  "La Liga",
  "Premier League",
  "Serie A",
  "Ligue 1",
  "Bundesliga"
] as const;
export type League = typeof allLeagues[number];

const leagueIds:Map<League, number> = new Map();
leagueIds.set("Premier League", 39);
leagueIds.set("La Liga", 140);
leagueIds.set("Serie A", 135);
leagueIds.set("Bundesliga", 78);
leagueIds.set("Ligue 1", 61);
export function getLeagueId(league: League){
  return leagueIds.get(league);
}
export const allPositions = [
  "gk",
  "cb",
  "rb",
  "lb",
  "cdm",
  "cm",
  "cam",
  "lm",
  "rm",
  "st",
  "cf",
  "rw",
  "lw",
] as const;
export type Position = typeof allPositions[number];

export interface Player {
  name: string;
  age: number;
  picture: string;
  position: Position;
  leagueId: string;
  statistics: {
    minutesPerGame: {
      current: Record<string, number>;
      total: number;
    }
  }
}