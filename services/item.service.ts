import instance from "../utils/axios";

export const getItem = async () => {
  const response = await instance.get("/items?_expand=category");
  return response.data;
};

export const postItem = async (credentials: {
  nama: string;
  harga: number;
  categoryId: number;
}) => {
  const response = await instance.post("/items", credentials);
  return response.data;
};

export const updateItem = async (
  id: number,
  credentials: {
    nama: string;
    harga: number;
    categoryId: number;
  }
) => {
  const response = await instance.put(`/items/${id}`, credentials);
  return response.data;
};
