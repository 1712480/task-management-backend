import User from "../models/user/user";

export const findByLogin = async (name: string) => {
	let user =  await User.findOne({
		userName: name
	});
	if (!user) {
		user = null;
	};
	return user;
}