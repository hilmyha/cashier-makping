type Items = {
  id: number;
  nama: string;
  harga: number;
  jumlah: number;
  category: {
    id: number;
    nama: string;
  };
};

type Category = { id: number; nama: string };

type Transaction = {
  id: number;
  quantity: number;
  total: number;
  items: Items[];
};

export { Items, Category, Transaction };
