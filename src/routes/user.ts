import express  from 'express';
import User from "../models/user/user";

const userRouter = express.Router();

userRouter.post('/create-user', async (req, res) => {
  const { userName, password } = req.body;
  const user = new User({ userName, password });
  await user.save()
    .then(response => {
      res.status(201).send(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

userRouter.post('/user-login', async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName })

  if (user !== null && user.password === password) {
    res.status(200).send(user);
  }

  res.status(404).send();
});

userRouter.post('/update-user', async (req, res) => {
  const { email, userName } = req.body;
  const user = await User.findOne({ email });

  if (user !== null) {
    user.userName = userName;
    await user.save()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(400).send(error);
      })
  }

  res.status(404).send();
});

userRouter.post('/change-password', async (req, res) => {
  const { email, password, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (user !== null && user.password === password) {
    user.password = newPassword;
    await user.save()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(400).send(error);
      })
  }

  res.status(400).send();
});

export default userRouter;