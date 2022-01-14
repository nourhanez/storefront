import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/orders'
import { verifyAuthToken } from '../middlewares/verifyToken'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
}

const showByUser = async (req: Request, res: Response) => {
   const orders = await store.showByUser(req.body.user_id)
   res.json(orders)
}


const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:user_id', verifyAuthToken, show)
}

export default orderRoutes;