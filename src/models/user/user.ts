import mongoose  from 'mongoose';

import { IUserDocument, IUserModal } from './user.d';

const userSchema = new mongoose.Schema(
	{
		userName: {
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
	const admin1 = new User({
		userName: 'admin1',
		password: '123456'
	});
	await admin1.save();
}

export default User;