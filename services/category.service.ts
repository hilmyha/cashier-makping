import instance from "../utils/axios";

export const getCategory = async () => {
  const response = await instance.get("/categories");
  return response.data;
};

export const postCategory = async (credentials: { nama: string }) => {
  const response = await instance.post("/categories", credentials);
  return response.data;
};

export const updateCategory = async (
  id: number,
  credentials: { nama: string }
) => {
  const response = await instance.put(`/categories/${id}`, credentials);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await instance.delete(`/categories/${id}`);
  return response.data;
};
