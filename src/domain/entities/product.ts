export interface Product {
  categories: string[],
  condition: string,
  free_shipping: boolean,
  id: string,
  picture: string,
  price: Price,
  title: string,
}

interface Price {
  amount: string,
  currency: string,
  decimals: number
}

export interface ProductDescription extends Omit<Product, 'categories'> {
  sold_quantity: number,
  description: string
}