import { Document, ObjectId } from "mongoose";

export default interface Team extends Document {
    name: string;
    active: boolean;
    players: [ObjectId];
}
