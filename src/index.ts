import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { connectDb } from "./models";
import { seedUser } from './models/user/user';
import { seedBoards } from "./models/board/board";
import { findByLogin } from './controllers/user';

import userRoute from './routes/user';
import boardRoute from "./routes/board";
const app = express();

app.use(cors());

app.use((req, res, next) => {
	next();
});

app.get('/', async (req, res) => {
	const user: any = await findByLogin('admin1');
	if (user === null) {
		res.send('null')
	}
	res.send(user);
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
			models.Boards.deleteMany({})
		]);

		// Seed data.
		await seedUser();
		await seedBoards();
		app.listen(port, () => {
			console.log(`Back-end listening on port ${port}`);
		});
	})
} catch (error) {
	console.log(error);
}