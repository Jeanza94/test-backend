import { Router } from "express";
import { ProductController } from "../controllers/productControllers";

export class ProductRouter {
  private static instance?: ProductRouter

  private constructor(
    private readonly router: Router,
    private readonly productController: ProductController
  ) {
    this.routes()  
  }

  static getIntance(): ProductRouter {
    if(!this.instance) {
      this.instance = new ProductRouter(Router(), ProductController.getInstance())
    }
    return this.instance
  }
  private routes() {
    this.router.get('/items', this.productController.getItems)
    this.router.get('/items/:id', this.productController.getItemById)
  }

  getRouter(): Router {
    return this.router
  }
}