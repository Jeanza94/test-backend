import { HttpResult } from '../interfaces/http';

export interface HttpAdapter {
  get<T>(url: string): Promise<HttpResult<T>>
}