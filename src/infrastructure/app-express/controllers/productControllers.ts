import {Request, Response} from 'express'
import { ProductRepository } from '../../../application/repositories/productRepository'
import { OptionsGetProduct } from '../../../application/interfaces'

export class ProductController {

  constructor(
    private readonly repository: ProductRepository,
  ) {}

  getItems = async(req: Request, res: Response) => {
    const { q, limit } = req.query as {q: string, limit: string}
    const options = {} as OptionsGetProduct
    if(q !== undefined) {
      options.query = q
    }

    if(limit && !isNaN(Number(limit))) {
      options.limit = Number(limit)
    }

    try {
      const products = await this.repository.getProducts(options)
      res.status(200).json(products)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'algo salio mal en el servidor'})
    }
  }

  getItemById = async(req: Request, res: Response) => {
    const id = req.params.id
    try {
      const product = await this.repository.getProductById(id)
      res.status(200).json(product)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'algo salio mal en el servidor'})
    }
  }
}
