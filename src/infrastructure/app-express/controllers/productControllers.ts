import {Request, Response} from 'express'
import { ProductRepository } from '../../../application/repositories/productRepository'
import { OptionsGetProduct } from '../../../application/interfaces'

export class ProductController {

  constructor(
    private readonly repository: ProductRepository,
  ) {}

  getItems = (req: Request, res: Response) => {
    const { q } = req.query as {q: string}
    const options = {} as OptionsGetProduct
    if(q !== undefined) {
      options.query = q
    }

    try {
      const products = this.repository.getProducts(options)
      res.status(200).json(products)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'algo salio mal en el servidor'})
    }
  }

  getItemById = (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).json({message: id})
  }
}
