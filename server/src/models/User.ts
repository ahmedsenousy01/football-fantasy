import { Schema, model } from "mongoose";
import UserInterface from "@/interfaces/user.interfaces";

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
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    verificationCode: {
        type: String,
        min: 6,
        max: 6,
        default: null,
    },
});

export default model<UserInterface>("user", schema);
