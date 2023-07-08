import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5009/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error: AxiosError) {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if(data.errors){
            const modelStateErrors: string[] = [];
            for(const key in data.errors){
                modelStateErrors.push(data.errors[key])
            }
            throw modelStateErrors.flat()
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        toast.error(data.title);
        break;
      default:
        break;
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response);
  }
);
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string) => axios.get(url).then(responseBody),
  put: (url: string) => axios.get(url).then(responseBody),
  delete: (url: string) => axios.get(url).then(responseBody),
};

const Catalogue = {
  productList: () => requests.get("products"),
  productInfo: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get("bugs/bad-request"),
  get401Error: () => requests.get("bugs/unauthorized"),
  get404Error: () => requests.get("bugs/not-found"),
  get500Error: () => requests.get("bugs/server-error"),
  getValidationError: () => requests.get("bugs/validation-error"),
};

const agent = {
  Catalogue,
  TestErrors,
};

export default agent;
