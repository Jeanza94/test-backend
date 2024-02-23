import { HttpAdapter } from "../../application/adapters/httpAdapter";
import { ProductDatasource } from "../../application/datasources/productDatasource";
import { OptionsGetProduct } from "../../application/interfaces";
import { ItemDescription, Product } from "../../domain/entities/product";
import { FreeMarketQueryResponse } from '../../application/interfaces/freeMarketQueryResponse';
import { FreeMarketMapperToProduct } from "../../application/services/freeMarketMapperToProduct";
import { FreeMarketItemResponse } from "../../application/interfaces/freeMarketItemResponse";
import { FreeMarketItemDescriptionResponse } from "../../application/interfaces/freeMarketItemDescriptionResponse";

export class FreeMarketDatasource implements ProductDatasource {
  private readonly baseUrl = 'https://api.mercadolibre.com'

  constructor(
    private readonly http: HttpAdapter
  ){}

  async getProducts(options: OptionsGetProduct): Promise<Product> {
    const {limit=4, query='relevantes'} = options
    const url = `${this.baseUrl}/sites/MLA/search?q=${query}&limit=${limit}`

    try {
      const response = await this.http.get<FreeMarketQueryResponse>(url)
      return FreeMarketMapperToProduct.convertJsonToProduct(response)
    } catch (error) {
      console.log(error)
      throw new Error('error en getProductsFreemarketDatasource')
    }
  }

  async getProductById(id:string): Promise<ItemDescription> {
    const urlItem = `${this.baseUrl}/items/${id}`
    const urlItemDescription = `${urlItem}/description`
    
    try {
      const [
        responseItem,
        responseItemDescription,
      ] = await Promise.all([
        this.http.get<FreeMarketItemResponse>(urlItem),
        this.http.get<FreeMarketItemDescriptionResponse>(urlItemDescription),
      ])
      return FreeMarketMapperToProduct.converJsonToItemDescription(responseItem,responseItemDescription.plain_text)
    } catch (error) {
      console.log(error)
      throw new Error('error en getProductsByIdFreemarketDatasource')
    }
  }
}