import { AppExpress } from "./infraestructure/app-express/app";
import express from 'express';

const expressApp = express()
const app = new AppExpress(expressApp)

app.listen()