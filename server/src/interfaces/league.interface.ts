import { Document } from "mongoose";

export default interface League extends Document {
    name: string;
    logo: string;
    flag: string;
}
