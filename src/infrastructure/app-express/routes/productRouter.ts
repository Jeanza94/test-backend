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
    /**
     * @openapi
     * /api/items:
     *   get:
     *     tags:
     *       - Product
     *     parameters:
     *       - name: q
     *         in: query
     *         description: search some products with this value
     *         required: false
     *         schema:
     *           type: string
     *           default: tennis
     *       - name: limit
     *         in: query
     *         description: limit the products
     *         required: false
     *         schema:
     *           type: number
     *           default: 4
     *        
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *              schema:
     *                $ref: "#/components/schemas/product"
     *       404:
     *         description: Product not found
     *         content:
     *           application/json:
     *              schema:
     *                $ref: "#/components/schemas/server_error_response"
     *       500:
     *         description: Error in server
     *         content:
     *           application/json:
     *              schema:
     *                $ref: "#/components/schemas/server_error_response"
    */
    this.router.get('/items', this.productController.getItems)

     /**
     * @openapi
     * /api/items/{id}:
     *   get:
     *     tags:
     *       - Item
     *     parameters:
     *       - name: id
     *         in: path
     *         description: item id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *              schema:
     *                $ref: "#/components/schemas/item_description"
     *       404:
     *         description: Product not found
     *         content:
     *           application/json:
     *              schema:
     *                $ref: "#/components/schemas/server_error_response"
     *       500:
     *         description: Error in server
     *         content:
     *           application/json:
     *              schema:
     *                $ref: "#/components/schemas/server_error_response"
    */
    this.router.get('/items/:id', this.productController.getItemById)
  }

  getRouter(): Router {
    return this.router
  }
}