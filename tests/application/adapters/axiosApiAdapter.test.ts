import { AxiosApiAdapter } from '../../../src/application/adapters/axiosApiAdapter';
import { APIQuotableResponse } from './interfaces/index';


describe('Test in axiosApiAdapter', () => {
  const axiosHttpAdapter = new AxiosApiAdapter()
  const urlQuoteApi = 'https://api.quotable.io/random'

  test('should get an HttpResult<ApiQuotableResponse> with the correct values', async() => { 
    const response = await axiosHttpAdapter.get<APIQuotableResponse>(urlQuoteApi)
    if('data' in response) {
      expect(response.data).toEqual({
        _id: expect.any(String),          
        content: expect.any(String),      
        author: expect.any(String),       
        tags: expect.any(Array<String>),         
        authorSlug: expect.any(String),   
        length: expect.any(Number),  
        dateAdded: expect.any(String), 
        dateModified: expect.any(String),
      })
    }else if('error' in response) {
      expect(response.error.message).toEqual(expect.any(String))
    }else {
      expect(response).toEqual({
        error:{
          message: 'Something was wrong in the server',
          status: 500
        }
      })
    }
  })
})
