import { CommonAttributes, Item, ItemDescription, Product } from "../../domain/entities/product";
import { FreeMarketItemResponse } from "../interfaces/freeMarketItemResponse";
import { FreeMarketQueryResponse, ItemResult } from "../interfaces/freeMarketQueryResponse";

export class FreeMarketMapperToProduct {
  static convertJsonToItem(json: ItemResult ): Item {
    const arrFullName = json.seller.nickname.split(' ')
    const commonAttributes = FreeMarketMapperToProduct.getCommonAttributes(json)
    return {
      author: {
        name: arrFullName[0],
        lastname: arrFullName[1]
      },
      picture: json.thumbnail,
      ...commonAttributes
    }
  }

  static convertJsonToProduct(json: FreeMarketQueryResponse): Product {
    const categories: string[] = []
    if(json.filters.length > 0) {
      json.filters[0].values[0].path_from_root.forEach(path_root => {
        categories.push(path_root.name)
      })
    }

    const items = json.results.map(item => FreeMarketMapperToProduct.convertJsonToItem(item))

    return {
      categories,
      items
    }
  }

  static converJsonToItemDescription(json: FreeMarketItemResponse, description: string): ItemDescription {
    const arrFullName = json.seller_address.city.name.split(' ')
    const commonAttributes = FreeMarketMapperToProduct.getCommonAttributes(json)
    return {
      author: {
        name: arrFullName[0],
        lastname: arrFullName[1]
      },
      description,
      picture: json.pictures[0].url,
      sold_quantity: json.initial_quantity,
      ...commonAttributes
    }
  }

  private static getCommonAttributes(json: ItemResult | FreeMarketItemResponse): CommonAttributes {
    let decimals = 0
    const arrPrice = json.price.toString().split(".")
    if (arrPrice.length > 1) {
      decimals = [...arrPrice[1]].length
    }
     
    return {
      title: json.title,
      condition: json.condition,
      free_shipping: json.shipping.free_shipping,
      id: json.id,
      price: {
        amount: json.price,
        currency: json.currency_id,
        decimals
      }
    }
  }
}