import { Express } from 'express';
import { ProductRouter } from './productRouter';

export class AppRouter {
  private readonly pathBase = '/api'

  constructor(
    private readonly productRouter: ProductRouter
  ) {}

  routes(app: Express) {
    app.use(this.pathBase, this.productRouter.getRouter())
  }
}