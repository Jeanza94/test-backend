
export interface HttpError {
  status: number,
  message: string,
}

export type HttpResult<T> =
| {data: T}
| {error: HttpError}