import { Document, Model } from 'mongoose';

export interface IColumnDocument extends Document {
	columnName: string,
	tickets?: Array
}
