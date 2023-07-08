import axios, {AxiosResponse} from "axios";

axios.defaults.baseURL = "http://localhost:5009/api/";

const responseBody = (response: AxiosResponse) => response.data;

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
}

const agent = {
    Catalogue,
    TestErrors
};

export default agent;