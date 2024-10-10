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
  transactionId: string;
  quantity: number;
  total: number;
  retur: number;
  status: string;
  items: Items[];
};

export { Items, Category, Transaction };
