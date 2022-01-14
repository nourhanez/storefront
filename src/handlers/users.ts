import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/users'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
   const user = await store.show(req.body.id)
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const newUser = await store.create(user)
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err + user)
    }
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  }
  try {
      const u = await store.authenticate(user.username, user.password)
      var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
      res.json(token)
  } catch(error) {
      res.status(401)
      res.json({ error })
  }
}

const verifyAuthToken = (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        next()
    } catch (error) {
        res.status(401)
    }
}

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', verifyAuthToken, create)
}

export default userRoutes;