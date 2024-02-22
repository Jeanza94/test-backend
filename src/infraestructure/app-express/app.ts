
import express, { Express } from 'express'
import cors from 'cors'
import { AppService } from '../../domain/services/appService'
import productRoutes from './routes/productRoutes'

export class AppExpress implements AppService {

  private readonly port = 8000
  private readonly pathBase = '/api'

  constructor(private readonly app: Express) {
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private routes() {
    this.app.use(this.pathBase, productRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Serving the app on port ${this.port}`)
    })
  }
}