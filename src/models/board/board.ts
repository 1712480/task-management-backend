import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema(
	{
		boardName: {
			type: String,
			unique: true,
			required: true
		},
	},
	{
		timestamps: true
	}
);

const Board = mongoose.model('Boards', boardSchema, 'boards');

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