import { Product, ProductDescription } from "../../domain/entities/product";
import { OptionsGetProduct } from "../interfaces";

export interface ProductRepository {
  getProduct(options: OptionsGetProduct): Promise<Product[]>
  getProductById(id: string): Promise<ProductDescription>
}