import { ProductDatasource } from "../../domain/datasources/productDatasource";
import { OptionsGetProduct } from "../../domain/interfaces";
import { ProductRepository } from '../../domain/repositories/productRepository';
import { Product, ItemDescription } from "../../domain/entities/product";
import { HttpResult } from '../../domain/interfaces/http';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    private readonly datasource: ProductDatasource
  ){}

  getProducts(options: OptionsGetProduct): Promise<HttpResult<Product>> {
    return this.datasource.getProducts(options)
  }

  getProductById(id: string): Promise<HttpResult<ItemDescription>> {
    return this.datasource.getProductById(id)
  }
  
}