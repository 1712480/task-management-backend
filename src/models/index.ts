import mongoose from 'mongoose';

import User from "./user/user";
import Boards from "./board/board";

const connectDb = () => mongoose.connect(process.env.DATABASE_URL as string);

const closeConnection = () => mongoose.disconnect()

const models = { User, Boards };

export { connectDb, closeConnection };

export default models;