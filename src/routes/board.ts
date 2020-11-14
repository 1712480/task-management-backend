import express from 'express';

import { updateTicket } from '../controllers/board';
import { seedColumns } from '../models/column/column';

import Board from '../models/board/board';
import Ticket from '../models/ticket/ticket';
import Column from '../models/column/column';

import { IColumnDocument } from '../models/column/column.d';
import { IBoardDocument } from '../models/board/board.d';
const boardRoute = express.Router();

boardRoute.get('/all-board', async (req, res) => {
	const boards = await Board.find({})
		.catch(error => {
			return res.status(400).send({
				error
			});
		});
	res.status(200).send({
		boards
	});
});

boardRoute.post('/create-board', async (req, res) => {
	const { boardName, description } = req.body;
	const newBoard = new Board({ boardName, description });
	await newBoard.save()
		.then(async board => {
			const result = await seedColumns(board._id);
			if (result && result.status === 200) {
				res.status(200).send({
					newBoardId: board._id
				});
			} else {
				res.status(400).send({
					error: result.error
				});
			}
		})
		.catch(error => {
			res.status(400).send({
				error
			});
		});
});

boardRoute.post('/create-ticket', async (req, res) => {
	const { ticketName, description, columnType, boardId } = req.body;

	const board: any = await Board.findOne({ _id: boardId })
		.populate('columns')
		.catch(error => {
			return res.status(400).send({
				error
			});
		});

	const column = board!.columns.find((temp: IColumnDocument) => temp.columnType === columnType);

	if (column) {
		const newTicket = new Ticket({ ticketName, description, column: column._id })
		await newTicket.save()
			.then(async ticket => {
				column.tickets.push(ticket);
				await column.save()
					.then((result: IColumnDocument) => {
						res.send(201).send(result);
					})
					.catch((error: any) => {
						res.send(400).send(error);
					});
			})
			.catch(error => {
				res.status(400).send(error);
			})
	} else {
		res.status(400).send({
			error: 'Can not find column'
		});
	}
});

boardRoute.post('/update-ticket', async (req, res) => {
	const { ticketId, newColumn } = req.body;
	const result = await updateTicket(ticketId, newColumn);
	if (result) {
		res.send({
			status: 201,
			message: 'Update succeed.'
		})
	} else {
		res.send({
			status: 400,
			message: 'Update failed.'
		})
	}
});

export default boardRoute;