import { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
	username: string,
	password: string
}

export interface IUserModal extends Model<IUserDocument> {
	findByLogin(username: string): () => IUserDocument | null;
}