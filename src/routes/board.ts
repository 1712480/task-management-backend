import express from 'express';

import { findBoardByName, updateTicket } from "../controllers/board";

const boardRoute = express.Router();

boardRoute.get('/', async (req, res) => {
	const { boardName } = req.query;
	const foundBoard = await findBoardByName(boardName as string);
	res.send(foundBoard);
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