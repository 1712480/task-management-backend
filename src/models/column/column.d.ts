import { Document, Model } from 'mongoose';

export interface IColumnDocument extends Document {
	columnType: number,
	tickets?: Array
}
