type Items = [
  id: number,
  nama: string,
  harga: number,
  cateoryId: number,
]

type Category = [
  id: number,
  nama: string,
]

type Transaction = [
  id: number,
  quantity: number,
  total: number,
  items: Items
]

export { Items, Category, Transaction }