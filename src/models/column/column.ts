import mongoose from 'mongoose';
import Board from '../board/board';

import { IColumnDocument } from './column.d';

const columnSchema = new mongoose.Schema(
    {
        columnName: {
            type: String,
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

export const seedColumns = async () => {
    const board1 = await Board.findOne({ boardName: 'board1' });

    const columnsData = [
        {
            columnName: 'wentWell',
            board: board1!._id
        },
        {
            columnName: 'toImprove',
            board: board1!._id
        },
        {
            columnName: 'actionItems',
            board: board1!._id
        }
    ];

    try {
        let columnsArray: IColumnDocument[] = [];
        columnsData.map(async column => {
            const newColumn = new Column(column);
            columnsArray.push(newColumn);
            await newColumn.save();
        })
        columnsArray.map((column: IColumnDocument) => board1!.columns.push(column));
        await board1!.save();
    } catch (error) {
        console.log(error);
    }
}
export default Column;
