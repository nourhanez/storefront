import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/products'
import { verifyAuthToken } from '../middlewares/verifyAuthToken'
import jwt from 'jsonwebtoken'


const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
   const products = await store.show(req.body.product_id)
   res.json(products)
}


const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category_id: req.body.category_id,
    }
    try {
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err + product)
    }
}


const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:product_id', show)
  app.post('/products', verifyAuthToken, create)
}

export default productRoutes;