import { Document, ObjectId } from "mongoose";
import { positionsType } from "@/enums/player.enums";

export default interface Player extends Document {
    name: string;
    age: number;
    picture: string | null;
    position: positionsType;
    price: number;
    leagueId?: ObjectId;
    statistics?: {
        games: {
            current: number;
            total: number;
        };
        minutesPerGame: Map<string, number>;
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
        cleanSheets: {
            current: number;
            total: number;
        };
    };
}
