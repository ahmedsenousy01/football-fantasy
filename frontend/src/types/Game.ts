export const allLeagues = [
  "La Liga",
  "Premiere League",
  "Serie A",
  "Ligue 1",
  "Bundesliga"
] as const;
export type League = typeof allLeagues[number];

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