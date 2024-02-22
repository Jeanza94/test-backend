import { ProductDatasource } from "../../application/datasources/productDatasource";
import { OptionsGetProduct } from "../../application/interfaces";
import { ProductRepository } from '../../application/repositories/productRepository';
import { Product, ItemDescription } from "../../domain/entities/product";

export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    private readonly datasource: ProductDatasource
  ){}

  getProducts(options: OptionsGetProduct): Promise<Product> {
    return this.datasource.getProducts(options)
  }

  getProductById(id: string): Promise<ItemDescription> {
    return this.datasource.getProductById(id)
  }
  
}