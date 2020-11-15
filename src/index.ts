import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import models, { connectDb } from "./models";
import { seedUser } from './models/user/user';
import { seedBoards } from "./models/board/board";
import { seedColumns } from "./models/column/column";
import { seedTicket } from "./models/ticket/ticket";

import userRoute from './routes/user';
import boardRoute from "./routes/board";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
	res.status(200).send({
		message: 'Hello from back-end.'
	});
});

app.use('/user', userRoute);
app.use('/board', boardRoute);

const port = process.env.PORT;

// Connect to database
try {
	connectDb().then(async () => {
		// Delete all current data.
		await Promise.all([
			models.User.deleteMany({}),
			models.Boards.deleteMany({}),
			models.Column.deleteMany({}),
			models.Ticket.deleteMany({})
		]);

		// // Seed data.
		// await seedUser();
		await seedBoards();
		app.listen(port, () => {
			console.log(`Back-end listening on port ${port}`);
		});
	})
} catch (error) {
	console.log(error);
}
