import { HttpAdapter } from "../../domain/adapters/httpAdapter";
import { ProductDatasource } from "../../domain/datasources/productDatasource";
import { OptionsGetProduct } from "../../domain/interfaces";
import { ItemDescription, Product } from "../../domain/entities/product";
import { FreeMarketQueryResponse } from '../interfaces/freeMarketQueryResponse';
import { FreeMarketMapperToProduct } from "../services/freeMarketMapperToProduct";
import { FreeMarketItemResponse } from "../interfaces/freeMarketItemResponse";
import { FreeMarketItemDescriptionResponse } from "../interfaces/freeMarketItemDescriptionResponse";
import { HttpResult } from '../../domain/interfaces/http';

export class FreeMarketDatasource implements ProductDatasource {
  private readonly baseUrl = 'https://api.mercadolibre.com'
  private readonly baseUrlQuery = `${this.baseUrl}/sites/MLA/search`

  constructor(
    private readonly http: HttpAdapter
  ){}

  async getProducts(options: OptionsGetProduct): Promise<HttpResult<Product>> {
    const {limit=4, query='tennis'} = options
    const url = `${this.baseUrlQuery}?q=${query}&limit=${limit}`
    const response = await this.http.get<FreeMarketQueryResponse>(url)
    return this.handlerErrorGetProducts(response)
      
  }

  async getProductById(id:string): Promise<HttpResult<ItemDescription>> {
    const urlItem = `${this.baseUrl}/items/${id}`
    const urlItemDescription = `${urlItem}/description`
    const [
      responseItem,
      responseItemDescription,
    ] = await Promise.all([
      this.http.get<FreeMarketItemResponse>(urlItem),
      this.http.get<FreeMarketItemDescriptionResponse>(urlItemDescription),
    ])
  
    if(responseItem && 'data' in responseItem) {
      const urlQuery = `${this.baseUrlQuery}?q=${responseItem.data.title}`
      const responseQueryItems = await this.http.get<FreeMarketQueryResponse>(urlQuery)
      return this.handlerErrorGetProductById(responseItem,responseItemDescription, responseQueryItems)
    }
    return this.handlerErrorGetProductById(responseItem,responseItemDescription)
  }

  private handlerErrorGetProducts(httpResult: HttpResult<FreeMarketQueryResponse>) {
    if('data' in httpResult) {
      if(httpResult.data.results.length === 0) return {
        error: {status:404, message: 'There are not results for the query introduced'}
      }
      return {
        data: FreeMarketMapperToProduct.convertJsonToProduct(httpResult.data)
      }
    }

    return {
      error: httpResult.error
    }
  }

  private handlerErrorGetProductById(httpResult1: HttpResult<FreeMarketItemResponse>, httpResult2:HttpResult<FreeMarketItemDescriptionResponse>, httpResult3?:HttpResult<FreeMarketQueryResponse>) {
    if('data' in httpResult1 && 'data' in httpResult2 && (httpResult3 && 'data' in httpResult3)) {
      const product = httpResult3.data.results.find(result => result.id === httpResult1.data.id)
      if(!product) return this.errorServer()
      return {
        data: FreeMarketMapperToProduct.converJsonToItemDescription(httpResult1.data,httpResult2.data.plain_text, product.available_quantity)
      }
    }

    if('error' in httpResult1) {
      return {
        error: httpResult1.error
      }
    }
    
    if('error' in httpResult2) {
      return {
        error: httpResult2.error
      }
    }

    return this.errorServer()
    

  }
  private errorServer() {
    return {
      error: {
        message: 'Something was wrong in the server',
        status: 500
      }
    }
  }

}