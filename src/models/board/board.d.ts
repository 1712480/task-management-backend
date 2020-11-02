import { Document, Model } from 'mongoose';

export interface IBoardDocument extends Document {
    boardName: string,
    columns?: Array
}
