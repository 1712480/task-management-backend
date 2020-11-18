import { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
	userName: string,
	password: string
}
