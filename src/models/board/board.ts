import mongoose from 'mongoose';

import { IBoardDocument } from './board.d';

import { seedColumns } from '../column/column';
import { seedTicket } from '../ticket/ticket';

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

	const col1 = [
		{
			ticketName: 'Do task 1',
			description: 'Some description of the task ...',
		},
		{
			ticketName: 'Do task 2',
			description: 'Some other description ...',
		},
	]

	const col2 = [
		{
			ticketName: 'Redo task 1',
			description: 'Reason why the task need more effort ...',
		},
	]

	const col3 = [
		{
			ticketName: 'New task 3',
			description: 'Description of the task ...',
		}
	]

	try {
		board.map(async (instance, index) => {
			const saveBoard = new Board(instance);
			await saveBoard.save();

			if (index === 0) {
				await seedColumns(saveBoard._id);
				await seedTicket(saveBoard._id, 1, col1);
				await seedTicket(saveBoard._id, 2, col2);
				await seedTicket(saveBoard._id, 3, col3);
			}
		});
	} catch (error) {
		console.log(error);
	}
}
export default Board;
