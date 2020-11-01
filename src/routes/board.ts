import express from 'express';

import { findBoardByName } from "../controllers/board";

const boardRoute = express.Router();

boardRoute.get('/', async (req, res) => {
	const { boardName } = req.query;
	const foundBoard = await findBoardByName(boardName as string);
	res.send(foundBoard);
});

export default boardRoute;