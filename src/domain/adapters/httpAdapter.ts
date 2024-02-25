import { HttpResult } from '../../application/interfaces/http';

export interface HttpAdapter {
  get<T>(url: string): Promise<HttpResult<T>>
}