import { Document, ObjectId } from "mongoose";

export default interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string | null;
    role: "admin" | "user";
    isVerified?: boolean;
    verificationCode?: string | null;
    accountLeague: string;
    budget: number;
    team?: ObjectId;
}
