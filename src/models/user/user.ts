import mongoose  from 'mongoose';

import { IUserDocument } from './user.d';

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			unique: true,
			required: true
		},
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

const User = mongoose.model<IUserDocument>('User', userSchema, 'users');

export const seedUser = async () => {
	const user = new User({
		userName: 'Hung Nguyen',
		email: '1712480@student.hcmus.edu.vn',
		password: '123456'
	});
	await user.save();
}

export default User;