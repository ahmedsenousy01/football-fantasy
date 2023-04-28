import { Schema, Types, model } from "mongoose";
import TeamInterface from "@/interfaces/team.interface";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    players: {
        type: [Types.ObjectId],
        ref: "player",
        default: [],
    }
});

export default model<TeamInterface>("team", schema);
