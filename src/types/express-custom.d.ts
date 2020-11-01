declare namespace Express {
	export interface Request {
		user: User,
		boardName: string
	}
}

interface User {
	username: string,
	password: string
}

declare module "express-custom";
