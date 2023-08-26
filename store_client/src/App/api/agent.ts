import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Router";
import { PaginatedResponse } from "../Models/Pagination";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1500));

axios.defaults.baseURL = "http://localhost:5009/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async function (response) {
    await sleep();
    const pagination = response.headers["pagination"];
    if(pagination) {response.data = new PaginatedResponse(
      response.data,
      JSON.parse(pagination)
    );}

    return response;
  },
  function (error: AxiosError) {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            modelStateErrors.push(data.errors[key]);
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
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
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url).then(responseBody),
  put: (url: string, body: {}) => axios.put(url).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalogue = {
  productList: (params: URLSearchParams) => requests.get("products", params),
  productInfo: (id: number) => requests.get(`products/${id}`),
  filters: () => requests.get("products/filters"),
};

const TestErrors = {
  get400Error: () => requests.get("bugs/bad-request"),
  get401Error: () => requests.get("bugs/unauthorized"),
  get404Error: () => requests.get("bugs/not-found"),
  get500Error: () => requests.get("bugs/server-error"),
  getValidationError: () => requests.get("bugs/validation-error"),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number) =>
    requests.post(`basket?productId=${productId}`, {}),
  removeItem: (productId: number) =>
    requests.delete(`basket?productId=${productId}`),
  updateItem: (productId: number, quantity: number) =>
    requests.put(`basket/item/${productId}/quantity/${quantity}`, {}),
};

const Account = {
    login: (values: any) => requests.post("account/login", values),
    register: (values: any) => requests.post("account/register", values),
    currentUser: () => requests.get("account/currentUser"),
}

const agent = {
  Catalogue,
  TestErrors,
  Basket,
};

export default agent;
