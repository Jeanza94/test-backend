import { Product, ItemDescription } from "../../domain/entities/product";
import { OptionsGetProduct } from "../interfaces";

export interface ProductRepository {
  getProducts(options: OptionsGetProduct): Promise<Product>
  getProductById(id: string): Promise<ItemDescription>
}