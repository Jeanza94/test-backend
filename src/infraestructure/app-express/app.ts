
import express, { Express } from 'express'
import cors from 'cors'
import { AppService } from '../../domain/services/appService'
import { ProductRouter } from './routes/productRouter'

export class AppExpress implements AppService {

  private readonly port = 8000
  private readonly pathBase = '/api'

  constructor(
    private readonly app: Express,
    private readonly productRoutes: ProductRouter
  ) {
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private routes() {
    this.app.use(this.pathBase, this.productRoutes.getRouter())
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Serving the app on port ${this.port}`)
    })
  }
}