
import express, { Express } from 'express'
import cors from 'cors'

export class AppExpress {

  private readonly port = 8000

  constructor(private readonly app: Express) {
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private routes() {
    this.app.get('/', (req, res) => {
      const headers = req.headers
      console.log(headers)
      return res.status(200).json({message: 'todo salio bien'})
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Serving the app on port ${this.port}`)
    })
  }
}