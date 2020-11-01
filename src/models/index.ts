import mongoose from 'mongoose';

import User from "./user/user";
import Boards from "./board/board";

const connectDb = () => {
	return mongoose.connect(process.env.DATABASE_URL as string);
}

const models = { User, Boards };

export { connectDb };

export default models;