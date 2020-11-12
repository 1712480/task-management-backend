import mongoose from 'mongoose';
import Column from '../column/column';

import { ITicketDocument } from './ticket.d';
const ticketSchema = new mongoose.Schema(
    {
        ticketName: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
        },
        column: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Column'
        }
    },
    {
        timestamps: true
    }
);

const Ticket = mongoose.model<ITicketDocument>('Ticket', ticketSchema, 'tickets');

export const seedTicket = async () => {
    const wentWell = await Column.findOne({ columnName: 'wentWell' });

    const ticketsData = [
        {
            ticketName: 'Implement',
            description: 'Implement logic',
            column: wentWell!._id
        },
        {
            ticketName: 'Debug',
            description: 'Debugging',
            column: wentWell!._id
        },
        {
            ticketName: 'Review',
            description: 'Reviewing',
            column: wentWell!._id
        }
    ];

    try {
        let ticketsArray: ITicketDocument[] = [];
        ticketsData.map(async ticket => {
            const newTicket = new Ticket(ticket);
            ticketsArray.push(newTicket);
            await newTicket.save();
        });
        ticketsArray.map((ticket: ITicketDocument) => wentWell!.tickets.push(ticket));
        await wentWell!.save();
    } catch (error) {
        console.log(error);
    }
};

export default Ticket;
