import {Request, Response} from 'express'

export class ProductController {
  private static instance?: ProductController

  private constructor() {}

  static getInstance(): ProductController {
    if(!ProductController.instance) {
      ProductController.instance = new ProductController
    }
    return ProductController.instance
  }

  getItems(req: Request, res: Response) {
    console.log(req)
    res.status(200).json({message: "hola"})
  }

  getItemById(req: Request, res: Response) {
    const id = req.params.id
    res.status(200).json({message: id})
  }
}
