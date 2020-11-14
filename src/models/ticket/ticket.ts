import mongoose from 'mongoose';

import Board from '../board/board';
import Column from '../column/column';

import { IColumnDocument } from '../column/column.d';
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

export const seedTicket = async (boardId: string, columnType: number, ticketData: any) => {
  const board = await Board.findOne({ _id: boardId });
  const col = board!.columns.find((column: IColumnDocument) => column.columnType === columnType);

  try {
    let ticketsArray: ITicketDocument[] = [];

    ticketData.map(async (ticket: any) => {
      const newTicket = new Ticket(ticket);
      ticketsArray.push(newTicket);
      await newTicket.save();
    });
    ticketsArray.map((ticket: ITicketDocument) => col!.tickets.push(ticket));
    await col!.save();

  } catch (error) {
    console.log(error);
  }
};

export default Ticket;
