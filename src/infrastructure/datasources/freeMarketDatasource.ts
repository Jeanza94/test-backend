import { HttpAdapter } from "../../application/adapters/httpAdapter";
import { ProductDatasource } from "../../application/datasources/productDatasource";
import { OptionsGetProduct } from "../../application/interfaces";
import { ItemDescription, Product } from "../../domain/entities/product";
import { FreeMarketQueryResponse } from '../../application/interfaces/freeMarketQueryResponse';
import { FreeMarketMapperToProduct } from "../../application/services/freeMarketMapperToProduct";
import { FreeMarketItemResponse } from "../../application/interfaces/freeMarketItemResponse";
import { FreeMarketItemDescriptionResponse } from "../../application/interfaces/freeMarketItemDescriptionResponse";
import { HttpResult } from '../../application/interfaces/http';

export class FreeMarketDatasource implements ProductDatasource {
  private readonly baseUrl = 'https://api.mercadolibre.com'

  constructor(
    private readonly http: HttpAdapter
  ){}

  async getProducts(options: OptionsGetProduct): Promise<HttpResult<Product>> {
    const {limit=4, query='tennis'} = options
    const url = `${this.baseUrl}/sites/MLA/search?q=${query}&limit=${limit}`
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
    
    return this.handlerErrorGetProductById(responseItem,responseItemDescription)
  }

  private handlerErrorGetProducts(httpResult: HttpResult<FreeMarketQueryResponse>) {
    if('data' in httpResult) {
      return {
        data: FreeMarketMapperToProduct.convertJsonToProduct(httpResult.data)
      }
    }

    return {
      error: httpResult.error
    }
  }

  private handlerErrorGetProductById(httpResult1: HttpResult<FreeMarketItemResponse>, httpResult2:HttpResult<FreeMarketItemDescriptionResponse>) {
    if('data' in httpResult1 && 'data' in httpResult2) {
      return {
        data: FreeMarketMapperToProduct.converJsonToItemDescription(httpResult1.data,httpResult2.data.plain_text)
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

    return {
      error: {
        message: 'Something was wrong in the server',
        status: 500
      }
    } 
  }


}