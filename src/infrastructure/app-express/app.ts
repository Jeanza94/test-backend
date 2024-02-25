
import { Express } from 'express'
import { AppService } from '../../domain/services/appService'
import { AppMiddlewares } from './middlewares/appMiddleware';
import { AppRouter } from './routes/appRouter';

export class AppExpress implements AppService {

  constructor(
    private readonly app: Express,
    private readonly appMiddlewares: AppMiddlewares,
    private readonly appRouter: AppRouter
  ) {
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.appMiddlewares.generalMiddlewares(this.app)
  }

  private routes() {
    this.appRouter.routes(this.app)
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Serving the app on port ${port}`)
    })
  }

  getAppInstance() {
    return this.app
  }
}