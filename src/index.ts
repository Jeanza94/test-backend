import express from 'express';
import { AppService } from "./domain/services/appService";
import { AppExpress } from "./infrastructure/app-express/app";
import { ProductRouter } from "./infrastructure/app-express/routes/productRouter";

const expressApp = express()
const productRouter = ProductRouter.getIntance()
const app: AppService = new AppExpress(expressApp, productRouter)

app.listen()