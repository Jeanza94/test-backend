import { Product, ItemDescription } from "../../domain/entities/product";
import { OptionsGetProduct } from "../interfaces";
import { HttpResult } from "../interfaces/http";

export interface ProductRepository {
  getProducts(options: OptionsGetProduct): Promise<HttpResult<Product>>
  getProductById(id: string): Promise<HttpResult<ItemDescription>>
}