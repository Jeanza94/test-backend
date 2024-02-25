import { Product, ItemDescription } from "../entities/product";
import { OptionsGetProduct } from "../../application/interfaces";
import { HttpResult } from "../../application/interfaces/http";

export interface ProductRepository {
  getProducts(options: OptionsGetProduct): Promise<HttpResult<Product>>
  getProductById(id: string): Promise<HttpResult<ItemDescription>>
}