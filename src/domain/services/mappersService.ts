import { Product, ProductDescription } from "../entities/product";

export interface MapperToProductService {
  getProduct(): Product
}

export interface MapperToProductDescriptionService {
  getProductDescription(): ProductDescription
}