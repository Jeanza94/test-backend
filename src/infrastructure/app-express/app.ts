
import express, { Express } from 'express'
import cors from 'cors'
import { AppService } from '../../domain/services/appService'
import { ProductRouter } from './routes/productRouter'

export class AppExpress implements AppService {

  private readonly port = 8000
  private readonly pathBase = '/api'

  constructor(
    private readonly app: Express,
    private readonly productRouter: ProductRouter
  ) {
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    console.log('middlewares')
  }

  private routes() {
    console.log('routes')
    this.app.use(this.pathBase, this.productRouter.getRouter())
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Serving the app on port ${this.port}`)
    })
  }
}