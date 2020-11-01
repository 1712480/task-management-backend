import express  from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
	res.json('user')
})

export default userRouter;