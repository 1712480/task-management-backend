import mongoose from 'mongoose';

import User from './user/user';
import Boards from './board/board';
import Column from './column/column';
import Ticket from './ticket/ticket';

const connectDb = () => mongoose.connect(process.env.MONGODB_URL as string);

const models = { User, Boards, Column, Ticket };

export { connectDb };

export default models;
