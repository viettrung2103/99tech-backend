// import { UserType } from "../models/userModel"
import { Request } from "express";
import { Document, Types } from "mongoose";

export interface UserType extends Document {
  _id: Types.ObjectId;
  name: string;
  username: string;
  password: string;
  phone_number: string;
  gender: string;
  date_of_birth: Date;
  membership_status: string;
  address: string;
  profile_picture?: string;
}

export interface AuthenticatedRequest extends Request{
  user?: UserType
}

