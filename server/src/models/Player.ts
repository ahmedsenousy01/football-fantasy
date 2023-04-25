import { Schema, Types, model } from "mongoose";
import PlayerInterface from "@/interfaces/player.interface";

const schema = new Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    position: {
        type: String,
        enum: ["Goalkeeper", "Defender", "Midfielder", "Attacker"],
    },
    picture: {
        type: String,
    },
    price: {
        type: Number,
    },
    leagueId: {
        type: Types.ObjectId,
    },
    statistics: {
        games: {
            current: Number,
            total: Number,
        },
        minutesPerGame: {
            current: {
                type: Map,
                of: Number,
    
            },
            total: Number,
        },
        goals: {
            current: Number,
            total: Number,
        },
        assists: {
            current: Number,
            total: Number,
        },
        cards: {
            yellow: {
                current: Number,
                total: Number,
            },
            red: {
                current: Number,
                total: Number,
            },
        },
        defensive: {
            current: {
                saves: Number,
                penaltySaves: Number,
                cleanSheets: Number,
            },
            total: {
                saves: Number,
                penaltySaves: Number,
                cleanSheets: Number,
            },
        },
        team: {
            name: String,
            logo: String,
        },
    },
});
export default model<PlayerInterface>("player", schema);
