export const allLeagues = [
  "La Liga",
  "Premier League",
  "Serie A",
  "Ligue 1",
  "Bundesliga",
] as const;
export type League = (typeof allLeagues)[number];

const leagueIds: Map<League, number> = new Map();
leagueIds.set("Premier League", 39);
leagueIds.set("La Liga", 140);
leagueIds.set("Serie A", 135);
leagueIds.set("Bundesliga", 78);
leagueIds.set("Ligue 1", 61);
export function getLeagueId(league: League) {
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
export type Position = (typeof allPositions)[number];

export interface Team {
  name: string;
  logo: string;
}

export interface PlayerStatistics {
  games: {
    current: number | null;
    total: number | null;
  };
  minutesPerGame: {
    current: Record<`${number}/${number}/${number}`, number>;
    total: number;
  };
  goals: {
    current: number | null;
    total: number | null;
  };
  assists: {
    current: number | null;
    total: number | null;
  };
  cards: {
    yellow: {
      current: number | null;
      total: number | null;
    };
    red: {
      current: number | null;
      total: number | null;
    };
  };
  defensive: {
    current: {
      saves: number | null;
      penaltySaves: number | null;
      cleanSheets: number | null;
    };
    total: {
      saves: number | null;
      penaltySaves: number | null;
      cleanSheets: number | null;
    };
  };
  team: Team;
}

export interface Player {
  statistics: PlayerStatistics;
  _id: string;
  name: string;
  age: number;
  position: string;
  picture: string;
  price: number;
  leagueId: string;
  points: number;
}
