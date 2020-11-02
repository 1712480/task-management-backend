import mongoose from 'mongoose';
import Column from '../column/column';

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

const Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

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
        ticketsData.map(async ticket => {
            const newTicket = new Ticket(ticket);
            await newTicket.save();
        })
    } catch (error) {
        console.log(error);
    }
};

export default Ticket;
