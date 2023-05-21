import { Schema, SchemaTypes, model } from "mongoose";
import TeamInterface from "@/interfaces/team.interface";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    players: {
        type: [SchemaTypes.ObjectId],
        ref: "player",
        default: [],
    }
});

export default model<TeamInterface>("team", schema);
