import axios from "axios";
import { HttpAdapter } from "../../domain/adapters/httpAdapter";
import { HttpError, HttpResult } from "../interfaces/http";


export class AxiosApiAdapter implements HttpAdapter {
  private readonly axios = axios
  constructor(){}

  async get<T>(url: string): Promise<HttpResult<T>> {
    try {
      const {data} = await this.axios.get<T>(url)
      return {data}
    } catch (error) {
      const errorResponse = this.handleError(error)
      return {
        error: errorResponse
      }
    }
  }

  private handleError(error: any): HttpError {
    if(axios.isAxiosError(error)) {
      return {
        message: error.message,
        status: error.status ? error.status : 404
      }
    }
    console.log('axiosApiAdapter', error)
    return {
      message: 'Something was wrong in the server',
      status: 500
    }
  }

}
