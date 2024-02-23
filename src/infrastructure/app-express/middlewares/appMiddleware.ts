import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from '../documentation/swagger'

export class AppMiddlewares {
  private express = express

  constructor(){} 
  
  generalMiddlewares(app: Express) {
    app.use(cors())
    app.use(this.express.json())
    app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup))
  }
}