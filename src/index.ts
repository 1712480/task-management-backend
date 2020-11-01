import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response }  from 'express';

import models, { connectDb } from "./models";
import { seedUser } from './models/user/user';
import { findByLogin } from './controllers/user';

import userRoute from './routes/user';
const app = express();

app.use(cors());

app.use((req: Request, res, next) => {
	next();
});

app.get('/', async (req, res) => {
	const user: any = await findByLogin('admin1');
	res.send(user);
});

app.use('/user', userRoute);

const port = process.env.PORT;

// Connect to database
connectDb().then(async () => {
	// Delete all current data.
	await Promise.all([
		models.User.deleteMany({})
	]);

	// Seed data.
	await seedUser();
	app.listen(port, () => {
		console.log(`Back-end listening on port ${port}`);
	});
})