import mongoose from 'mongoose';
import Board from '../board/board';

import { IColumnDocument } from './column.d';
import { seedTicket } from '../ticket/ticket';

const columnSchema = new mongoose.Schema(
  {
    columnType: {
      type: Number,
      required: true
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board'
    },
    tickets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket'
    }]
  },
  {
    timestamps: true
  }
);

const Column = mongoose.model<IColumnDocument>('Column', columnSchema, 'columns');

export const seedColumns = async (boardId: string) => {
  const board = await Board.findOne({ _id: boardId });

  const columnsData = [
    {
      columnType: 1,
      board: board!._id,
      tickets: [
        {
          ticketName: 'Do task 1',
          description: 'Some description of the task ...',
        },
        {
          ticketName: 'Do task 2',
          description: 'Some other description ...',
        },
      ]
    },
    {
      columnType: 2,
      board: board!._id,
      tickets: [
        {
          ticketName: 'Redo task 1',
          description: 'Reason why the task need more effort ...',
        },
      ]
    },
    {
      columnType: 3,
      board: board!._id,
      tickets: [
        {
          ticketName: 'New task 3',
          description: 'Description of the task ...',
        }
      ]
    }
  ];

  try {
    let columnsArray: any[] = [];
    columnsData.map(async (column, index) => {
      const newColumn = new Column(column);
      columnsArray.push(newColumn);
      await newColumn.save();
      // await seedTicket(boardId, column.columnType, column.tickets);
    });
    columnsArray.map((column: IColumnDocument) => board!.columns.push(column));
    await board!.save();
    return {
      status: 200
    };
  } catch (error) {
    return {
      status: 400,
      error
    }
  }
}

export default Column;
