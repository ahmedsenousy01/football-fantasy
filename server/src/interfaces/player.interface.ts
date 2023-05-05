import { Document, ObjectId } from "mongoose";
import { positionsType } from "@/enums/player.enums";

export default interface Player extends Document {
    name: string;
    age: number;
    picture: string | null;
    position: positionsType;
    price: number;
    points: number;
    leagueId?: ObjectId;
    statistics?: {
        games: {
            current: number;
            total: number;
        };
        minutesPerGame: object;
        goals: {
            current: number;
            total: number;
        };
        assists: {
            current: number;
            total: number;
        };
        cards: {
            yellow: {
                current: number;
                total: number;
            };
            red: {
                current: number;
                total: number;
            };
        };
        defensive: {
            current: {
                saves: number;
                penaltySaves: number;
                cleanSheets: number;
                goalsConceded: number;
            };
            total: {
                saves: number;
                penaltySaves: number;
                cleanSheets: number;
                goalsConceded: number;
            };
        };
        team: {
            name: string;
            logo: string;
        };
    };
}
