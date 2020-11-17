import { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
	userName: string,
	email: string,
	password: string
}
