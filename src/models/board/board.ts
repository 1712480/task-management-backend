import mongoose from 'mongoose';

import { IBoardDocument } from './board.d';
import { seedColumns } from '../column/column'

const boardSchema = new mongoose.Schema(
	{
		boardName: {
			type: String,
			unique: true,
			required: true
		},
		description: {
			type: String,
		},
		columns: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Column'
			}
		]
	},
	{
		timestamps: true
	}
);

const Board = mongoose.model<IBoardDocument>('Board', boardSchema, 'boards');

export const seedBoards = async () => {
	const board = [
		{
			boardName: 'HCMUS Retro board',
			description: 'With some demo tickets ...'
		},
		{
			boardName: 'BKU Retro board'
		},
		{
			boardName: 'UIT Retro board'
		},
		{
			boardName: 'RMIT Retro board'
		}
	];

	try {
		board.map(async (instance, index) => {
			const saveBoard = new Board(instance);
			await saveBoard.save();

			index === 0 && await seedColumns(saveBoard._id);
		});
	} catch (error) {
		console.log(error);
	}
}
export default Board;
