import axios from "axios";
import TokenService from "./TokenService";

const baseApi = "http://localhost:5102/api";
const itendityApi = "http://localhost:5102/api";

export const IdentityHttpClient = axios.create({
    baseURL: itendityApi,
});

 const HttpClient = axios.create({
    baseURL: baseApi,
});

export const setHttpClientHeader = () => {
    const token = TokenService.getToken()?.token;
    HttpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const clearHttpClientHeader = () => {
    HttpClient.defaults.headers.common.Authorization = '';
}

setHttpClientHeader();

export default HttpClient