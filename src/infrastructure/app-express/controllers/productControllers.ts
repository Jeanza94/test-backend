import {Request, Response} from 'express'
import { ProductRepository } from '../../../domain/repositories/productRepository'
import { OptionsGetProduct } from '../../../application/interfaces'
import { HttpResult } from '../../../application/interfaces/http'

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

    const products = await this.repository.getProducts(options)
    
    this.handleResponse(products, res)
    
  }

  getItemById = async(req: Request, res: Response) => {
    const id = req.params.id
    const product = await this.repository.getProductById(id)
    this.handleResponse(product, res)    
  
  }

  private handleResponse = <T>(response:HttpResult<T>, res:Response) => {
    if('data' in response) {
      return res.status(200).json(response.data)
    }
    return res.status(response.error.status).json({message: response.error.message})
  }
}
