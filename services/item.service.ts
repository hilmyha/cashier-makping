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
