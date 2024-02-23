import {Request, Response} from 'express'
import { ProductRepository } from '../../../application/repositories/productRepository'

export class ProductController {

  constructor(
    private readonly repository: ProductRepository,
  ) {
    console.log(this.repository)
  }

  getItems = (req: Request, res: Response) => {
    console.log(req)
    console.log(this.repository)
    res.status(200).json({message: "hola"})
  }

  getItemById = (req: Request, res: Response) => {
    const id = req.params.id
    console.log(this.repository)
    res.status(200).json({message: id})
  }
}
