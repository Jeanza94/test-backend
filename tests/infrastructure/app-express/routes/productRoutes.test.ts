import request from 'supertest'
import { appTestServer } from '../../../testServer'
import {Product} from '../../../../src/domain/entities/product'
import { HttpError } from '../../../../src/application/interfaces/http';
import { ItemDescription } from '../../../../../test-practico/src/app/items/interfaces/freeMarket';

describe('Test product routes', () => { 
  const baseUrl = '/api/items'

  test('should return api/items', async() => { 
    const response = await request(appTestServer)
      .get(baseUrl)
      .expect(200)

    const product: Product = response.body

    expect(product.items.length).toBe(4)
    const {author, ...restItem} = product.items[0]
    expect(author.name).toEqual(expect.any(String))

    expect(restItem).toEqual({
      condition: expect.any(String),
      free_shipping: expect.any(Boolean),
      id: expect.any(String),
      picture: expect.any(String),
      price: {
        amount: expect.any(Number),
        currency: expect.any(String),
        decimals: expect.any(Number)
      },
      title: expect.any(String)
    })
  })

  test('should return filtered items with query and limit', async() => { 
    const response = await request(appTestServer)
      .get(`${baseUrl}?q=futbol&limit=1`)
      .expect(200)
    
    const product = response.body as Product
    const keyWordsRelated = ['pelota', 'futbol', 'cancha', 'zapatillas', 'campo']
    const items = product.items
    
    expect(product.items.length).toBe(1)
    const isTheKeyInTitle = keyWordsRelated.some(key => items[0].title.match(new RegExp(key, 'gi')))
    expect(isTheKeyInTitle).toBeTruthy()
  })

  test('should return a status 404 for 0 results', async() => { 
    const response = await request(appTestServer)
      .get(`${baseUrl}?q=precio`)
      .expect(404)

    const {message} = response.body as HttpError
    expect(message).toBe('There are not results for the query introduced')
  })

  test('should return the item with id MLA1381790089 and other props', async() => { 
    const response = await request(appTestServer)
      .get(`${baseUrl}/MLA1381790089`)
      .expect(200)

    const {author, ...restItem} = response.body as ItemDescription
    expect(author.name).toEqual(expect.any(String))
    expect(restItem).toEqual({
      condition: expect.any(String),
      free_shipping: expect.any(Boolean),
      id: 'MLA1381790089',
      picture: expect.any(String),
      price: {
        amount: expect.any(Number),
        currency: expect.any(String),
        decimals: expect.any(Number)
      },
      title: expect.any(String),
      sold_quantity: expect.any(Number),
      description: expect.any(String)
    })
  })

  test('should return a status 404 with an invalid id', async() => { 
    const response = await request(appTestServer)
      .get(`${baseUrl}/novalido`)
      .expect(404)

    const {message} = response.body as HttpError
    expect(message).toBe('Request failed with status code 404')
  })

})