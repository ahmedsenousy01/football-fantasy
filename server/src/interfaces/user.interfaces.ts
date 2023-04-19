import { Document } from "mongoose";

export default interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string | null;
    isVerified: boolean;
    verificationCode: string | null;
}
