import axios from "axios";
import { HttpAdapter } from "../../application/adapters/httpAdapter";


export class AxiosApiAdapter implements HttpAdapter {
  private readonly axios = axios
  constructor(){}

  async get<T>(url: string): Promise<T> {
      const {data} = await this.axios.get<T>(url)
      return data
  }

}
