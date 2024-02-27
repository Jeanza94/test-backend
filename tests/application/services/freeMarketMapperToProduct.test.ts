import { FreeMarketMapperToProduct } from "../../../src/application/services/freeMarketMapperToProduct"
import { dataTestFreeMarketItemReponse } from "./data-test/dataTestFreeMarketItemResponse"
import { dataTestFreeMarketQueryResponse } from "./data-test/dataTestFreeMarketQueryResponse"
import { itemResult } from "./data-test/dataTestItemResult"

describe('Test in the freeMarketMapperToProduct', () => { 
  test('should get an Item from an ItemResult', () => {
    const item = FreeMarketMapperToProduct.convertJsonToItem(itemResult)
    expect(item).toEqual({
      author: {
        name: 'PUNTO',
        lastname: 'DEPORTIVO'
      },
      condition: 'Nuevo',
      free_shipping: true,
      id: 'MLA1402215060',
      picture: 'http://http2.mlstatic.com/D_617698-MLA71630560994_092023-O.jpg',
      price: {
        amount: 47578.78,
        currency: 'ARS',
        decimals: 2
      },
      title: 'Pelota Penalty Campo Bravo Xxiii Fluo Azul',
    })
  })
  
  test('should get a product from an FreeMarketQueryResponse', () => {
    const item = FreeMarketMapperToProduct.convertJsonToProduct(dataTestFreeMarketQueryResponse)
    expect(item).toEqual({
      categories:  [
        'Deportes y Fitness',
        'Fútbol',
        'Equipamiento y Entrenamiento',
        'Pelotas',
      ],
      items: [
        {
          author: {
            lastname: 'DEPORTIVO',
            name: 'PUNTO',
          },
          condition: 'Nuevo',
          free_shipping: true,
          id: 'MLA1381790089',
          picture: 'http://http2.mlstatic.com/D_803448-MLU73200349417_122023-I.jpg',
          price: {
            amount: 40168.97,
            currency: 'ARS',
            decimals: 2,
          },
          title: 'Pelota Penalty Campo Bravo Xxiii Fluo Azul Color Fluo/azul',
        },
      ],
      totalPages: 9,
      hasNextPage: true
    })
  })

  test('should get a ItemDescription from a FreeMarketItemResponse + description + availableQuantity', () => {
    const item = FreeMarketMapperToProduct.converJsonToItemDescription(dataTestFreeMarketItemReponse, 'buen articulo', 5)
    expect(item).toEqual({
      author: {
        lastname: undefined,
        name: 'Moreno',
      },
      condition: 'Nuevo',
      description: 'buen articulo',
      free_shipping: true,
      id: 'MLA1381790089',
      picture: 'http://http2.mlstatic.com/D_803448-MLU73200349417_122023-O.jpg',
      price: {
        amount: 40168.97,
        currency: 'ARS',
        decimals: 2,
      },
      sold_quantity: 1032,
      title: 'Pelota Penalty Campo Bravo Xxiii Fluo Azul Color Fluo/azul',
    })
  })
})

