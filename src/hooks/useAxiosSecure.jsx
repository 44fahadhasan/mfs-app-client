import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      // when request get then set token in header
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const errorStatus = error?.response?.status;
      if (errorStatus === 401 || errorStatus === 403) {
        // todo
      }
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
