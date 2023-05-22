import { Schema, model } from "mongoose";
import LeagueInterface from "@/interfaces/league.interface";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    flag: {
        type: String,
        required: true,
    },
});

export default model<LeagueInterface>("league", schema);
