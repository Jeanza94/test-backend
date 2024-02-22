import express from 'express';
import { AppService } from "./domain/services/appService";
import { AppExpress } from "./infraestructure/app-express/app";
import { ProductRouter } from "./infraestructure/app-express/routes/productRouter";

const expressApp = express()
const productRouter = ProductRouter.getIntance()
const app: AppService = new AppExpress(expressApp, productRouter)

app.listen()