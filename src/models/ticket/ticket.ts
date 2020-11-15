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
  const board = await Board.findOne({ _id: boardId }).populate('columns');
  const desColumn = board!.columns.find((col: any) => col.columnType === columnType);
  const column = await Column.findOne({ _id: desColumn._id })

  if (column) {
    try {
      let ticketsArray: ITicketDocument[] = [];

      ticketData.map(async (ticket: any) => {
        const newTicket = new Ticket(ticket);
        ticketsArray.push(newTicket);
        await newTicket.save();
      });

      ticketsArray.map((ticket: ITicketDocument) => column.tickets.push(ticket));
      await column.save();
    } catch (error) {
      console.log(error);
    }
  }
};

export default Ticket;
