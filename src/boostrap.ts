import express, { Router } from 'express';
import { AppService } from "./domain/services/appService";
import { AppExpress } from "./infrastructure/app-express/app";
import { ProductRouter } from "./infrastructure/app-express/routes/productRouter";
import { ProductController } from './infrastructure/app-express/controllers/productControllers';
import { ProductRepositoryImpl } from './application/repositories/productRepositoryImpl';
import { FreeMarketDatasource } from './application/datasources/freeMarketDatasource';
import { AxiosApiAdapter } from './application/adapters/axiosApiAdapter';
import { AppMiddlewares } from './infrastructure/app-express/middlewares/appMiddleware';
import { AppRouter } from './infrastructure/app-express/routes/appRouter';
import { envs } from '../config/envs';

export const boostrap = () => {
  const expressApp = express()
  const http = new AxiosApiAdapter()
  const datasource = new FreeMarketDatasource(http)
  const productRepository = new ProductRepositoryImpl(datasource)
  const productController = new ProductController(productRepository)
  const router = Router()
  const productRouter = new ProductRouter(router, productController)
  const appRouter = new AppRouter(productRouter)
  const appMiddlewares = new AppMiddlewares()
  const app: AppService = new AppExpress(expressApp, appMiddlewares,appRouter)

  app.listen(envs.PORT)
}
