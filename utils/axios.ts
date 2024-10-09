import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.0.2.2:3000",
});

// interceptor request
instance.interceptors.request.use(
  (config) => {
    console.log(config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor response
instance.interceptors.response.use(
  (response) => {
    console.log(response);

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
