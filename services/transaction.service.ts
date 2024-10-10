import instance from "../utils/axios";
import { Items } from "../utils/types";

export const getTransaction = async () => {
  const response = await instance.get("/transactions");
  return response.data;
}

export const postTransaksi = async (credentials: {
  transactionId: string;
  quantity: number;
  total: number;
  retur: number;
  status: string;
  items: Items[];
}) => {
  const response = await instance.post("/transactions", credentials);
  return response.data;
}

