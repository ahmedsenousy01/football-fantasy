import { Schema, Types, model } from "mongoose";
import UserInterface from "@/interfaces/user.interface";

const schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        min: 6,
        max: 6,
        default: null,
    },
    budget: {
        type: Number,
        default: 100000,
    },
    accountLeague: {
        type: String,
        required: true,
    },
    teams: {
        type: Types.ObjectId,
        ref: "team",
        default: null,
    },
});

export default model<UserInterface>("user", schema);
