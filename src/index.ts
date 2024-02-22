import { AppService } from "./domain/services/appService";
import { AppExpress } from "./infraestructure/app-express/app";
import express from 'express';

const expressApp = express()
const app: AppService = new AppExpress(expressApp)

app.listen()