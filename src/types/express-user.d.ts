declare namespace Express {
	export interface Request {
		user: User
	}
}

interface User {
	username: string,
	password: string
}

declare module "express-user";
