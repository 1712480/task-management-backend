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

export default Board;