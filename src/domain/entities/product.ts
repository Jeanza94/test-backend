
export interface Product {
  items: Item[],
  categories: string[],
  hasNextPage: boolean,
  totalPages: number,
}

export interface Item {
  author: Author,
  condition: string,
  free_shipping: boolean,
  id: string,
  picture: string,
  price: Price,
  title: string,
}


interface Price {
  amount: number,
  currency: string,
  decimals: number
}

interface Author {
  name: string,
  lastname: string,
}
export interface ItemDescription extends Item {
  sold_quantity: number,
  description: string
}

export interface CommonAttributes extends Omit<Item, 'author'| 'picture'| 'sold_quantity'> {}