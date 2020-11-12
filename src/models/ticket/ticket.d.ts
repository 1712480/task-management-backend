import { Document, Model } from 'mongoose';

export interface ITicketDocument extends Document {
	ticketName: string,
	description?: string,
	column?: object
}
