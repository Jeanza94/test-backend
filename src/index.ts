import express, { Router } from 'express';
import { AppService } from "./domain/services/appService";
import { AppExpress } from "./infrastructure/app-express/app";
import { ProductRouter } from "./infrastructure/app-express/routes/productRouter";
import { ProductController } from './infrastructure/app-express/controllers/productControllers';
import { ProductRepositoryImpl } from './infrastructure/repositories/productRepositoryImpl';
import { FreeMarketDatasource } from './infrastructure/datasources/freeMarketDatasource';
import { AxiosApiAdapter } from './infrastructure/adapters/axiosApiAdapter';

const boostrap = () => {
  const expressApp = express()
  const http = new AxiosApiAdapter()
  const datasource = new FreeMarketDatasource(http)
  const productRepository = new ProductRepositoryImpl(datasource)
  const productController = new ProductController(productRepository)
  const router = Router()
  const productRouter = new ProductRouter(router, productController)
  const app: AppService = new AppExpress(expressApp, productRouter)

  app.listen()
}

boostrap()