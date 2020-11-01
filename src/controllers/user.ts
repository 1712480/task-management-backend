import User from "../models/user/user";

export const findByLogin = async (name: string) => {
	let user =  await User.findOne({
		username: name
	});
	if (!user) {
		user = null;
	};
	return user;
}