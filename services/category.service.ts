import instance from "../utils/axios";

export const getCategory = async () => {
  const response = await instance.get("/categories");
  return response.data;
};
