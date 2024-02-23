import { Router } from "express";
import { ProductController } from "../controllers/productControllers";

export class ProductRouter {

  constructor(
    private readonly router: Router,
    private readonly productController: ProductController
  ) {
    this.routes()
  }

  private routes() {
    this.router.get('/items', this.productController.getItems)
    this.router.get('/items/:id', this.productController.getItemById)
  }

  getRouter(): Router {
    return this.router
  }
}