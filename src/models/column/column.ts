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
    },
    {
      columnType: 2,
      board: board!._id,

    },
    {
      columnType: 3,
      board: board!._id,
    }
  ];

  try {
    let columnsArray: any[] = [];
    columnsData.map(async (column, index) => {
      const newColumn = new Column(column);
      columnsArray.push(newColumn);
      await newColumn.save();
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
