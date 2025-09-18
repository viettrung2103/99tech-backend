import mongoose, { Schema, Document, Model } from "mongoose";
import { UserType } from "../types/types";

const userSchema: Schema<UserType> = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const User: Model<UserType> = mongoose.model<UserType>("User", userSchema);

export default User;
