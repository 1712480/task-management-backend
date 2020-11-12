import mongoose from 'mongoose';

import { IBoardDocument } from './board.d';

const boardSchema = new mongoose.Schema(
	{
		boardName: {
			type: String,
			unique: true,
			required: true
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
	const board = new Board({
		boardName: 'board1'
	})

	try {
		await board.save();
	} catch (error) {
		console.log(error);
	}
}
export default Board;
