import express, { Router } from 'express';
import { AxiosApiAdapter } from '../src/infrastructure/adapters/axiosApiAdapter';
import { FreeMarketDatasource } from '../src/infrastructure/datasources/freeMarketDatasource';
import { ProductRepositoryImpl } from '../src/infrastructure/repositories/productRepositoryImpl';
import { ProductController } from '../src/infrastructure/app-express/controllers/productControllers';
import { ProductRouter } from '../src/infrastructure/app-express/routes/productRouter';
import { AppRouter } from '../src/infrastructure/app-express/routes/appRouter';
import { AppMiddlewares } from '../src/infrastructure/app-express/middlewares/appMiddleware';
import { AppExpress } from '../src/infrastructure/app-express/app';

const expressApp = express()
const http = new AxiosApiAdapter()
const datasource = new FreeMarketDatasource(http)
const productRepository = new ProductRepositoryImpl(datasource)
const productController = new ProductController(productRepository)
const router = Router()
const productRouter = new ProductRouter(router, productController)
const appRouter = new AppRouter(productRouter)
const appMiddlewares = new AppMiddlewares()

export const appTestServer = new AppExpress(expressApp, appMiddlewares,appRouter).getAppInstance()

